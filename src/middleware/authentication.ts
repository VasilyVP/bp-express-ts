import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import validator from 'validator';

const secret = process.env.AUTH_SECRET_STR || '';
const jwtMaxAge = process.env.JWT_MAX_AGE || 6;

type userT = {
    name: string,
    email: string,
};

interface RequestWithUserT extends Request {
    user?: userT,
}

export default class Authentication {
    static async getJWT(user: userT): Promise<string> {
        return new Promise((resolve, reject) => {
            JWT.sign(user, secret, {
                expiresIn: String(jwtMaxAge) + 'h',
            }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    }

    static setTokenCookie(res: Response, token: string) {
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: true,
            maxAge: Number(jwtMaxAge) * 60 * 60 * 1000,
        })
    }

    static async setJWTCookie(user: userT, res: Response) {
        try {
            const token = await Authentication.getJWT(user);
            Authentication.setTokenCookie(res, token);
        } catch (err) {
            throw Error("Can't sign jwt cookie: " + err.message);
        }        
    }

    static async verifyJWT(jwt: string): Promise<userT> {
        return new Promise((resolve, reject) => {
            JWT.verify(jwt, secret, (err, user) => {
                if (err) reject(err);
                resolve(user as userT);
            });
        });
    }

    static async authentication(req: RequestWithUserT, res: Response, next: NextFunction) {
        const jwt = req.cookies.jwt;

        if (jwt && validator.isJWT(jwt)) {
            try {
                const user = await Authentication.verifyJWT(jwt);
                req.user = user;
            } catch (err) {
                // what to do if token is not valid
                next();
            }
        }
        next();
    }
}

import express, { Request, Response, NextFunction } from 'express';
import { ErrorT } from './commonTypes';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import fs from 'fs';
//import cors from 'cors';

import auth from './middleware/authentication';// .authentication;
import cfg from './app-config.json';
import routes from './routes/index';

const app = express();

/** NGINX proxy required */
//app.enable('trust proxy');

/** CORS enable */
//app.use(cors())

app.use(express.json());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(auth.authentication);

/**
 * Logging
*/
// development
if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
}
// access log
if (process.env.ACCESS_LOG_FROM) {
    const morganLogWriteStream = fs.createWriteStream(path.join(__dirname, cfg.accessLog), { flags: 'a' });
    app.use(logger('combined', {
        skip: (req, res) => res.statusCode < parseInt(process.env.ACCESS_LOG_FROM as string),
        stream: morganLogWriteStream
    }));
}

/** Handling all routes */
app.use('/', routes);

/** Not Found handling */
app.all('*', (req, res) => {
    res.status(404).json({
        code: 404,
        message: 'Not Found',
    });
});

/**
 * Errors handling
 */
const errorsStream = fs.createWriteStream(path.join(__dirname, cfg.errorLog), { flags: 'a' });
app.use((err: ErrorT, req: Request, res: Response, next: NextFunction) => {
    if (createError.isHttpError(err)) {
        if (errorsStream) errorsStream.write(new Date().toUTCString() + ` ${err.message}\n Error stack:\n ${err.stack}\n`);

        res.status(err.status).json({
            code: err.status,
            message: err.status < 500 ? err.message : 'Server Error',
        });
    } else {
        if (errorsStream) errorsStream.write(new Date().toUTCString() + ` ${err}\n`);

        res.status(500).json({
            code: 500,
            message: 'Internal Server Error',
        });
    }
});

export default app;
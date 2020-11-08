import { NextFunction, Request, Response } from "express";
import express from 'express';
//import auth from '../middleware/authentication';

const router = express.Router();

export default router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        code: 200,
        message: 'root route',
    });
});
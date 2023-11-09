import { Request, Response, NextFunction } from "express";
import { Evaluation } from "../types";

export const validateEvaluation = () => (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as Evaluation;
        next();
    } catch (error) {
        return res.status(400);
    }
    return;
}
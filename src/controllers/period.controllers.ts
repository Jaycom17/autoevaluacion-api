import { Request, Response } from "express";

export const getPeriods = async(_req: Request, res: Response) => {
    res.json({hola: "hey"}).status(201);
}
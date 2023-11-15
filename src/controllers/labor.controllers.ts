import { Request, Response } from "express";

export const getLabors = async(_req: Request, res: Response) => {
    res.json({hola: "hey"}).status(201);
}
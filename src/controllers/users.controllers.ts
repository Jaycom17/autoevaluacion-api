import { Request, Response } from "express";

export const userLogin = (_req: Request, res: Response) => {
    res.send("Login");
}
import { Request, Response } from "express";

import { User } from "../models/user.model";

const UserModel = new User();

export const userLogin = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    const user =  await UserModel.login(email, password);
    res.json(user).status(201);
}
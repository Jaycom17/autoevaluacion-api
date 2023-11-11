import { Request, Response } from "express";

import { User } from "../models/user.model";

const UserModel = new User();

export const userLogin = async (req: Request, res: Response) => {
  const { usu_email, usu_contrasena } = req.body;
  const user: any = await UserModel.login(usu_email, usu_contrasena);
  if (user.message || user.error) {
    res.status(400).json(user);
    return;
  }
  res.cookie("token", user.token, {
    httpOnly: process.env.NODE_ENV !== "development",
    secure: false,
    sameSite: "none",
  });

  res.json(user.userData);
  return;
};

export const userLogOut = async (_req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

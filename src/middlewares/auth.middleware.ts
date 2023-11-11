import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error: any, user: any) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.body.user = user;
      next();
      return;
    });
  } catch (error) {
    return res.status(500).json({ message: "there was an error" });
  }

  return;
};

import jwt from "jsonwebtoken";
import { TOKEN_SECRET, ROLES } from "../config";
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

export const authProfessor = (req: Request, res: Response, next: NextFunction) => {
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

      if(user.userRol !== "docente"){
        return res.status(401).json({ message: "User is not a professor" });
      }

      if(user.userRol !== ROLES.PROFESSOR){
        return res.status(401).json({ message: "User is not a professor" });
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

export const authCordinator = (req: Request, res: Response, next: NextFunction) => {
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

      if(user.userRol !== ROLES.CORDINATOR){
        return res.status(401).json({ message: "User is not a coordinator" });
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

export const authRector = (req: Request, res: Response, next: NextFunction) => {
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

      if(user.userRol !== ROLES.RECTOR){
        return res.status(401).json({ message: "User is not a rector" });
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


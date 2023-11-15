import { Request, Response } from "express";

import { User } from "../models/user.model";
import { Evaluation } from "../models/evaluation.model";

const UserModel = new User();
const EvaluationModel = new Evaluation();

EvaluationModel.addObserver(UserModel);

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

export const createEvaluation = async (req: Request, res: Response) => {
  const {
    evaId,
    evaState,
    evaScore,
    evaResult,
    evaPeriod,
    evaLabor,
    usrId,
    rolId,
  } = req.body;
  const evaluation = await EvaluationModel.createEvaluation(
    evaId,
    evaState,
    evaScore,
    evaResult,
    evaPeriod,
    evaLabor,
    usrId,
    rolId,
  );
  res.json(evaluation).status(201);
};
export const deleteEvaluation = async (req: Request, res: Response) => {
  const evaId: number = parseInt(req.params.id);
  console.log(evaId);
  const evaluation = await EvaluationModel.deleteEvaluation(evaId);
  res.json(evaluation).status(201);
};
export const getEvaluation = async (req: Request, res: Response) => {
  const evaId: number = parseInt(req.params.id);
  console.log(evaId);
  const evaluation = await EvaluationModel.getEvaluation(evaId);
  res.json(evaluation).status(201);
};

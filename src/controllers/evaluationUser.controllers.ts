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
  res.cookie("token", user.token);

  res.json(user.userData);
  return;
};

export const registerUser = async (req: Request, res: Response) => {
  const { userId, userName, userLastName, userGenre, userStudy, userEmail, userPassword, usuRol } = req.body;
  const user = await UserModel.register(
    userId,
    userName,
    userLastName,
    userGenre,
    userStudy,
    userEmail,
    userPassword,
    usuRol
  );

  res.send(user).status(201);
};

export const getProfessors = async (_req: Request, res: Response) => {
  try {
    const professors = await UserModel.getProfessors();

    res.status(201).json(professors);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
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
    eva_id,
    eva_labor,
    eva_period,
    usr_id,
    eva_state
  } = req.body;
  const evaluation = await EvaluationModel.createEvaluation(
    eva_id,
    eva_labor,
    eva_period,
    usr_id,
    eva_state
  );
  if(evaluation){
    res.status(201).json({message: "Evaluación creada con éxito"});
  }
  else{
    res.status(400).json({message: "Error al crear la evaluación"});
  }
};
export const updateEvaluation = async (req: Request, res: Response) => {
  const {
    eva_id,
    eva_labor,
    eva_period,
    usr_id,
    eva_state
  } = req.body;
  const evaluation = await EvaluationModel.createEvaluation(
    eva_id,
    eva_labor,
    eva_period,
    usr_id,
    eva_state
  );
  if(evaluation){
    res.status(201).json({message: "Evaluación creada con éxito"});
  }
  else{
    res.status(400).json({message: "Error al crear la evaluación"});
  }
};

export const deleteEvaluation = async (req: Request, res: Response) => {
  const evaId: number = parseInt(req.params.id);
  console.log(evaId);
  const evaluation = await EvaluationModel.deleteEvaluation(evaId);
  res.json(evaluation).status(201);
};

export const checkEvaluation = async (req: Request, res: Response) => {
  const evaId: number = parseInt(req.params.id);
  console.log(evaId);
  const evaluation = await EvaluationModel.checkEvaluation(evaId);
  res.json(evaluation).status(201);
};

export const makeEvaluation = async (req: Request, res: Response) => {
  const { evaId, evaScore, evaResult } = req.body;
  const evaluation = await EvaluationModel.makeEvaluation(
    evaId,
    evaScore,
    evaResult
  );
  res.json(evaluation).status(201);
};

export const getEvaluation = async (_req: Request, res: Response) => {
  try {
    // No necesitas el ID si estás obteniendo todas las evaluaciones
    const evaluations = await EvaluationModel.getEvaluation();

    res.status(200).json(evaluations);
  } catch (error) {
    console.error("Error al obtener las evaluaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

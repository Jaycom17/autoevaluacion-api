import { Request, Response } from "express";

import { Evaluation } from "../models/evaluation.model";

const EvaluationModel = new Evaluation();

export const createEvaluation = async (req: Request, res: Response) => {
    const { evaId, evaState, evaScore, evaResult, evaPeriod, evaLabor ,usrId,rolId} = req.body;
    const evaluation = await EvaluationModel.createEvaluation(evaId, evaState, evaScore, evaResult, evaPeriod,evaLabor,usrId,rolId);
    res.json(evaluation).status(201);
}
export const deleteEvaluation = async (req: Request, res: Response) => {
    const evaId : number = parseInt(req.params.id);
    console.log(evaId);
    const evaluation = await EvaluationModel.deleteEvaluation(evaId);
    res.json(evaluation).status(201);
}
export const getEvaluation = async (req: Request, res: Response) => {
    const evaId: number = parseInt(req.params.id);
    console.log(evaId);
    const evaluation = await EvaluationModel.getEvaluation(evaId);
    res.json(evaluation).status(201);
}
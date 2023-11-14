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
export const checkEvaluation = async (req: Request, res: Response) => {
    const evaId: number = parseInt(req.params.id);
    console.log(evaId);
    const evaluation = await EvaluationModel.checkEvaluation(evaId);
    res.json(evaluation).status(201);
}
export const updateEvaluation = async (req: Request, res: Response) => {
    const { evaId ,evaScore, evaResult} = req.body;
    const evaluation = await EvaluationModel.updateEvaluation(evaId, evaScore, evaResult);
    res.json(evaluation).status(201);
}

export const getEvaluation = async (_req: Request, res: Response) => {
    try {
        // No necesitas el ID si estás obteniendo todas las evaluaciones
        const evaluations = await EvaluationModel.getEvaluation();

        res.status(200).json(evaluations);
    } catch (error) {
        console.error('Error al obtener las evaluaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

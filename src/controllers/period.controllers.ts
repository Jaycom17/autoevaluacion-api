import { Request, Response } from "express";

import { Period } from "../models/period.model";

const PeriodModel = new Period();


export const createPeriod = async (req: Request, res: Response) => {
    //perId: number, perName: string, perInitDate: string, perFinishDate: string
    const { per_id, per_nombre, per_fechainicio, per_fechafin} = req.body;
    const period = await PeriodModel.createPeriod(per_id, per_nombre, per_fechainicio, per_fechafin);
    res.json(period).status(201);
}

export const searchPeriod = async (req: Request, res: Response) => {
    const perId : number = parseInt(req.params.id);
    const period = await PeriodModel.searchPeriod(perId);
    res.json(period).status(200);
}

export const getPeriodList = async(_req: Request, res: Response) => {
    const periods = await PeriodModel.getPeriodList();
    res.json(periods).status(200);
}

export const updatePeriod = async (req: Request, res: Response) => {
    const { per_id, per_nombre, per_fechainicio, per_fechafin} = req.body;
    const period = await PeriodModel.updatePeriod(per_id, per_nombre, per_fechainicio, per_fechafin);
    res.json(period).status(200);
}
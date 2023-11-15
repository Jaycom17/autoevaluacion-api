import { Request, Response } from "express";

import { Labor } from "../models/labor.model";

const LaborModel = new Labor();

export const createLabor = async(req: Request, res: Response) => {
    const { LAB_ID, TL_ID, LAB_NOMBRE, LAB_HORAS} = req.body;
    const labor =  await LaborModel.createLabor(LAB_ID, TL_ID, LAB_NOMBRE, LAB_HORAS);
    res.json(labor).status(201);
}

export const showLaborByID = async(req: Request, res: Response) => {
    const labor =  await LaborModel.showLaborByID(parseInt(req.params.id));
    res.json(labor).status(200);
}

export const showLaborList = async(_req: Request, res: Response) => {
    const labor =  await LaborModel.showLaborList();
    res.json(labor).status(200);
}

export const updateLabor = async(req: Request, res: Response) => {
    const { LAB_ID, TL_ID, LAB_NOMBRE, LAB_HORAS } = req.body;
    const labor =  await LaborModel.updateLabor(LAB_ID, TL_ID, LAB_NOMBRE, LAB_HORAS);
    res.json(labor).status(200);
}

export const deleteLabor = async(req: Request, res: Response) => {
    const labor =  await LaborModel.deleteLabor(parseInt(req.params.id));
    res.json(labor).status(201);
}
import { Request, Response } from "express";

import { Labor } from "../models/labor.model";

const LaborModel = new Labor();

export const createLabor = async(req: Request, res: Response) => {
    const { labName, labTime, labType } = req.body;
    const labor =  await LaborModel.createLabor(labName, labTime, labType);
    res.json(labor).status(201);
}

export const showLabor = async(req: Request, res: Response) => {
    const labor =  await LaborModel.showLabor(parseInt(req.params.id));
    res.json(labor).status(201);
}

export const updateLabor = async(req: Request, res: Response) => {
    const { labName, labTime, labType } = req.body;
    const labor =  await LaborModel.updateLabor(labName, labTime, labType);
    res.json(labor).status(201);
}

export const deleteLabor = async(req: Request, res: Response) => {
    const labor =  await LaborModel.deleteLabor(parseInt(req.params.id));
    res.json(labor).status(201);
}
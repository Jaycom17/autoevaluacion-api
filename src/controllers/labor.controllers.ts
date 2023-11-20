import { Request, Response } from "express";

import { Labor } from "../models/labor.model";

const LaborModel = new Labor();
const queryString = require('querystring');

export const createLabor = async(req: Request, res: Response) => {
    const { TL_DESCRIPCION, LAB_NOMBRE, LAB_HORAS} = req.body;
    const labor =  await LaborModel.createLabor(TL_DESCRIPCION, LAB_NOMBRE, LAB_HORAS);
    if(!labor){
        res.status(400).json({ status: 'error', message: 'Error al crear la labor' });
    }else{
        res.status(201).json({ status: 'ok', message: 'Labor creada correctamente' });
    }
}

export const showLaborByName = async(req: Request, res: Response) => {
    //En caso de que el nombre tenga espacios, estos se codifican para que no haya error
    const decodedName = queryString.unescape(req.params.name)

    const labor =  await LaborModel.showLaborByName(decodedName);
    if (labor === null) {
        res.status(500).json({ error: 'Error al buscar labor por nombre' });
    } else if (labor === false) {
        res.status(404).json({ message: 'Labor no encontrada por nombre' });
    } else {
        res.status(200).json(labor);
    }
}

export const showLaborList = async(_req: Request, res: Response) => {
    const labor =  await LaborModel.showLaborList();
    if (labor === null) {
        res.status(500).json({ error: 'Error al buscar labor(es)' });
    } else if (labor === false) {
        res.status(404).json({ message: 'No se encontraron labores' });
    } else {
        res.status(200).json(labor);
    }
}

export const updateLabor = async(req: Request, res: Response) => {
    const { LAB_ID, TL_DESCRIPCION, LAB_NOMBRE, LAB_HORAS } = req.body;
    const labor =  await LaborModel.updateLabor(LAB_ID, TL_DESCRIPCION, LAB_NOMBRE, LAB_HORAS);
    if (labor === null) {
        res.status(500).json({ status: 'error', message: 'Error al actualizar la labor' });
    } else if (labor === false) {
        res.status(404).json({ status: 'error', message: 'Labor no encontrada para actualizar' });
    } else {
        res.json(labor).status(200);
    }
}

export const deleteLabor = async(req: Request, res: Response) => {
    const labor =  await LaborModel.deleteLabor(parseInt(req.params.id));
    if(!labor){
        res.status(400).json({ status: 'error', message: 'Error al eliminar la labor' });
    }else{
        res.status(201).json({ status: 'ok', message: 'Labor eliminada correctamente' });
    }
}
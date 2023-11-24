import { Request, Response } from "express";

import { Stats } from "../models/stats.model";

const StatsModel = new Stats();

export const getAvgScrPrLbr = async (_req: Request, res: Response) => {
    const stats = await StatsModel.getAvgScrPrLbr();
    if(stats === null){
        res.status(500).json({status: 'error', message: 'Algo ocurrió al momento de obtener las estadísticas'});
    } else{
        res.status(201).json(stats);
    }
}

export const getAvgScrPrPrd = async (_req: Request, res: Response) => {
    const stats = await StatsModel.getAvgScrPrPrd();
    if(stats === null){
        res.status(500).json({status: 'error', message: 'Algo ocurrió al momento de obtener las estadísticas'});
    } else{
        res.status(201).json(stats);
    }
}

export const getEvalCntPrLbrTp = async (_req: Request, res: Response) => {
    const stats = await StatsModel.getEvalCntPrLbrTp();
    if(stats === null){
        res.status(500).json({status: 'error', message: 'Algo ocurrió al momento de obtener las estadísticas'});
    } else{
        res.status(201).json(stats);
    }
}

export const getAvgPrLbrTpPrd = async (_req: Request, res: Response) => {
    const stats = await StatsModel.getAvgPrLbrTpPrd();
    if(stats === null){
        res.status(500).json({status: 'error', message: 'Algo ocurrió al momento de obtener las estadísticas'});
    } else{
        res.status(201).json(stats);
    }
}
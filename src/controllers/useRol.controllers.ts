import { Request, Response } from "express";

import { UseRol } from "../models/useRol.models";

const UseRolModel = new UseRol();

export const getRol = async (req: Request, res: Response) => {
    const rolId : number = parseInt(req.params.id);
    const rol = await UseRolModel.getRol(rolId);
    res.json(rol).status(200);
}
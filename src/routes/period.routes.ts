import { Router } from "express";

import { createPeriod, getPeriodList, searchPeriod, updatePeriod } from "../controllers/period.controllers";

const periodRouter = Router();

periodRouter.post("/period", createPeriod);//Create
periodRouter.get("/period/:id", searchPeriod);//Read 2
periodRouter.get("/period", getPeriodList);//Read
periodRouter.put("/period", updatePeriod);//Update

export default periodRouter;
import { Router } from "express";

import { createPeriod, getPeriodList, searchPeriod, updatePeriod } from "../controllers/period.controllers";

const periodRouter = Router();

periodRouter.post("/period", createPeriod);//Create
periodRouter.get("/period/:id", getPeriodList);//Read
periodRouter.get("/period", searchPeriod);//Read 2
periodRouter.put("/period", updatePeriod);//Update

export default periodRouter;
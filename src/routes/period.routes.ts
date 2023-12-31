import { Router } from "express";

import { createPeriod, getPeriodList, searchPeriod, updatePeriod, deletePeriod } from "../controllers/period.controllers";

import { authCordinator } from "../middlewares/auth.middleware";

const periodRouter = Router();

periodRouter.post("/period",authCordinator, createPeriod);//Create
periodRouter.get("/period/:id",authCordinator, searchPeriod);//Read 2
periodRouter.get("/period",authCordinator, getPeriodList);//Read
periodRouter.put("/period/:id",authCordinator, updatePeriod);//Update
periodRouter.delete("/period/:id",authCordinator, deletePeriod);//Update

export default periodRouter;
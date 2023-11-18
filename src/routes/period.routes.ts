import { Router } from "express";

import { createPeriod, getPeriodList, searchPeriod, updatePeriod } from "../controllers/period.controllers";

import { authCordinator } from "../middlewares/auth.middleware";

const periodRouter = Router();

periodRouter.post("/period",authCordinator, createPeriod);//Create
periodRouter.get("/period/:id",authCordinator, searchPeriod);//Read 2
periodRouter.get("/period",authCordinator, getPeriodList);//Read
periodRouter.put("/period",authCordinator, updatePeriod);//Update

export default periodRouter;
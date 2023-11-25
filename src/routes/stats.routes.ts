import { Router } from "express";

import { getAvgScrPrLbr, getAvgScrPrPrd, getEvalCntPrLbrTp, getAvgPrLbrTpPrd } from "../controllers/stats.constrollers";

import { authCordinator } from "../middlewares/auth.middleware";

const statsRouter = Router()

statsRouter.get("/stats/avgScrPrLbr", authCordinator, getAvgScrPrLbr) //Average Score Per Labor

statsRouter.get("/stats/avgScrPrPrd", authCordinator, getAvgScrPrPrd) //Average Score Per Period

statsRouter.get("/stats/evalCntPrLbrTp", authCordinator, getEvalCntPrLbrTp) //Evaluation Count Per Labor Type

statsRouter.get("/stats/avgScrPrLbrTpPrd", authCordinator, getAvgPrLbrTpPrd) //Average Score Per Labor Type & Period

export default statsRouter;

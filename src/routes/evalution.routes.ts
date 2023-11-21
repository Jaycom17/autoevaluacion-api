import { Router } from "express";
import {
  checkEvaluation,
  createEvaluation,
  deleteEvaluation,
  updateEvaluation,
  makeEvaluation,
  getEvaluation,
} from "../controllers/evaluationUser.controllers";

import { auth, authCordinator } from "../middlewares/auth.middleware";

const evaluationRouter = Router();

evaluationRouter.get("/evaluation/:id", auth, checkEvaluation);
evaluationRouter.delete("/evaluation/:id", authCordinator, deleteEvaluation);
evaluationRouter.post("/evaluation", authCordinator, createEvaluation);
evaluationRouter.put("/evaluation", authCordinator, updateEvaluation);
evaluationRouter.post("/evaluation", auth, makeEvaluation);
evaluationRouter.get("/evaluation", auth, getEvaluation);

export default evaluationRouter;

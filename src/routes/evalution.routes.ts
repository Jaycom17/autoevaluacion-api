import { Router } from "express";
import {
  checkEvaluation,
  createEvaluation,
  deleteEvaluation,
  updateEvaluation,
  makeEvaluation,
  getEvaluations,
  getEvaluationProffesor,
} from "../controllers/evaluationUser.controllers";

import { auth, authCordinator } from "../middlewares/auth.middleware";

const evaluationRouter = Router();

evaluationRouter.get("/evaluation/:id", auth, checkEvaluation);
evaluationRouter.get("/evaluation/professor/:id", auth, getEvaluationProffesor);
evaluationRouter.delete("/evaluation/:id", authCordinator, deleteEvaluation);
evaluationRouter.post("/evaluation", authCordinator, createEvaluation);
evaluationRouter.put("/evaluation", authCordinator, updateEvaluation);
evaluationRouter.post("/evaluation/make", auth, makeEvaluation);
evaluationRouter.get("/evaluation", auth, getEvaluations);

export default evaluationRouter;

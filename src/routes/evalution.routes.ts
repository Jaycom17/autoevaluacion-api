import { Router } from "express";
import {
  checkEvaluation,
  createEvaluation,
  deleteEvaluation,
  updateEvaluation,
  getEvaluation,
} from "../controllers/evaluationUser.controllers";

import { auth, authCordinator } from "../middlewares/auth.middleware";

const evaluationRouter = Router();

evaluationRouter.get("/evaluation/:id", auth, checkEvaluation);
evaluationRouter.delete("/evaluation/:id", authCordinator, deleteEvaluation);
evaluationRouter.post("/evaluation", authCordinator, createEvaluation);
evaluationRouter.put("/evaluation", auth, updateEvaluation);
evaluationRouter.get("/evaluation", auth, getEvaluation);

export default evaluationRouter;

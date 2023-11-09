import { Router } from "express";
import { getEvaluation, createEvaluation, deleteEvaluation } from "../controllers/evaluation.controllers";

const evaluationRouter = Router();

evaluationRouter.get("/evaluation/:id", getEvaluation);
evaluationRouter.delete("/evaluation/:id", deleteEvaluation);
evaluationRouter.post("/evaluation", createEvaluation);

export default evaluationRouter;

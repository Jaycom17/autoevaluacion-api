import { Router } from "express";
import { checkEvaluation, createEvaluation, deleteEvaluation, updateEvaluation ,getEvaluation } from "../controllers/evaluation.controllers";

const evaluationRouter = Router();

evaluationRouter.get("/evaluation/:id", checkEvaluation);
evaluationRouter.delete("/evaluation/:id", deleteEvaluation);
evaluationRouter.post("/evaluation", createEvaluation);
evaluationRouter.put("/evaluation", updateEvaluation);
evaluationRouter.get("/evaluation", getEvaluation);




export default evaluationRouter;

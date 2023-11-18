import { Router } from "express";

import { createLabor, showLaborByName, showLaborList, updateLabor, deleteLabor } from "../controllers/labor.controllers";

import { authCordinator } from "../middlewares/auth.middleware";

const laborRouter = Router();


laborRouter.get("/labor/:name", showLaborByName); //GetByName

laborRouter.post("/labor",authCordinator, createLabor); //Create

laborRouter.get("/labor/:id",authCordinator, showLaborByID); //GetByID

laborRouter.get("/labor",authCordinator, showLaborList) //GetAll

laborRouter.put("/labor",authCordinator, updateLabor); //Update

laborRouter.delete("/labor/:id",authCordinator, deleteLabor); //Delete


export default laborRouter;
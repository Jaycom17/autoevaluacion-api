import { Router } from "express";

import { createLabor, showLaborByName, showLaborById, showLaborList, getLaborType, getLaborMinMaxHours, updateLabor, deleteLabor } from "../controllers/labor.controllers";

import { authCordinator } from "../middlewares/auth.middleware";

const laborRouter = Router();


laborRouter.post("/labor", authCordinator, createLabor); //Create

laborRouter.get("/labor/name/:name", authCordinator, showLaborByName); //GetByName

laborRouter.get("/labor/:id", authCordinator, showLaborById); //GetByID

laborRouter.get("/labor", authCordinator, showLaborList) //GetAll

laborRouter.get("/laborType", authCordinator, getLaborType) //GetLaborTypes
//////////////////////////////////////////////////////////////////////////////////////
laborRouter.get("/laborTypeH/:name", authCordinator, getLaborMinMaxHours) //GetLaborMinMaxHours
//////////////////////////////////////////////////////////////////////////////////////
laborRouter.put("/labor/:id", authCordinator, updateLabor); //Update

laborRouter.delete("/labor/:id", authCordinator, deleteLabor); //Delete

export default laborRouter;
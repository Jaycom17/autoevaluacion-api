import { Router } from "express";

import { createLabor, showLaborByID, showLaborList, updateLabor, deleteLabor } from "../controllers/labor.controllers";

const laborRouter = Router();

laborRouter.get("/labor", getLabors);//Create

laborRouter.post("/labor", createLabor); //Create

laborRouter.get("/labor/:id", showLaborByID); //GetByID

laborRouter.get("/labor", showLaborList) //GetAll

laborRouter.put("/labor", updateLabor); //Update

laborRouter.delete("/labor/:id", deleteLabor); //Delete


export default laborRouter;
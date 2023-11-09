import { Router } from "express";

import { createLabor, showLabor, updateLabor, deleteLabor } from "../controllers/labor.controllers";

const laborRouter = Router();

laborRouter.post("/labor", createLabor);

laborRouter.get("/labor/:id", showLabor);

laborRouter.put("/labor", updateLabor);

laborRouter.delete("/labor/:id", deleteLabor);

export default laborRouter;
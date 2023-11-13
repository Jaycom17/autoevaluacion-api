import { Router } from "express";

import { getLabors } from "../controllers/labor.controllers";

const laborRouter = Router();

laborRouter.get("/labor", getLabors);//Create

export default laborRouter;
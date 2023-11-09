import { Router } from "express";

import { getPeriods } from "../controllers/period.controllers";

const periodRouter = Router();

periodRouter.get("/period", getPeriods);

export default periodRouter;
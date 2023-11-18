import { Router } from "express";

import { getRol } from "../controllers/useRol.controllers";

import { authCordinator } from "../middlewares/auth.middleware";

const useRolRouter = Router();

useRolRouter.get("/useRol/:id",authCordinator, getRol);

export default useRolRouter;
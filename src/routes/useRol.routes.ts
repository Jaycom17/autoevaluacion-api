import { Router } from "express";

import { getRol } from "../controllers/useRol.controller";

const useRolRouter = Router();

useRolRouter.get("/useRol/:id", getRol);

export default useRolRouter;
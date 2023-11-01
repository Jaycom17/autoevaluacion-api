import { Router } from "express";

import { userLogin } from "../controllers/users.controllers";

const userRouter = Router();

userRouter.post("/user/login", userLogin);

export default userRouter;
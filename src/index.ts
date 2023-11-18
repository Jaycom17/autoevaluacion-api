import express from "express";
import { PORT } from "./config";

import userRouter from "./routes/users.routes";
import laborRouter from "./routes/labors.routes";
import periodRouter from "./routes/period.routes";
import useRolRouter from "./routes/useRol.routes";
import evaluationRouter from "./routes/evalution.routes";


import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', laborRouter);
app.use('/api', periodRouter);
app.use('/api', useRolRouter);
app.use('/api', evaluationRouter);

app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
});

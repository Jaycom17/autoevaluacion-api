import express from "express";
import { PORT } from "./config";

import userRouter from "./routes/users.routes";
import laborRouter from "./routes/labors.routes";
import evaluationRouter from "./routes/evalution.routes";


const app = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', laborRouter);
app.use('/api', evaluationRouter);


app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
});

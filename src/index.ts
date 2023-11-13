import express from "express";
import { PORT } from "./config";

import userRouter from "./routes/users.routes";
import laborRouter from "./routes/labors.routes";
import periodRouter from "./routes/period.routes";
import useRolRouter from "./routes/useRol.routes";

const app = express();

app.use(express.json());

app.use('/api', userRouter);
app.use('/api', laborRouter);
app.use('/api', periodRouter);
app.use('/api', useRolRouter);


app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
});

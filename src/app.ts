import express, { Request, Response } from "express";
import { baseRoutes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(globalErrorHandler);
app.use(baseRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Shine Server!");
});

export default app;

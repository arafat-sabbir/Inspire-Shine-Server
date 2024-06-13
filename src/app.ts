import express, { Request, Response } from "express";
import { baseRoutes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app = express();
import cors from "cors";

app.use(express.json());
app.use(cors());

app.use("/api/v1", baseRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Shine Server!");
});
app.use(globalErrorHandler);
export default app;

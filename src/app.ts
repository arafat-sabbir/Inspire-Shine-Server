import express, { Request, Response } from "express";
import { baseRoutes } from "./app/routes";
const app = express();

app.use(express.json());
app.use(baseRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Shine Server!");
});

export default app;

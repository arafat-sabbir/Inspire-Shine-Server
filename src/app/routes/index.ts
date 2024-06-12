import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

const router = Router();

const routes = [
  {
    path: "/user",
    route: userRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const baseRoutes = router;

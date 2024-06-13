import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";

const router = Router();

const routes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/user",
    route: authRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const baseRoutes = router;

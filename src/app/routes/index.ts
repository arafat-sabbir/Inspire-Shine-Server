import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { serviceRoutes } from "../modules/service/service.route";
import { slotRoutes } from "../modules/slot/slot.route";

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
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "/services",
    route: slotRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const baseRoutes = router;

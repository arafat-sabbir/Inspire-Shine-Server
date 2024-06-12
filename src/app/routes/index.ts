import { Router } from "express";

const router = Router();

const routes = [
  {
    path: "/",
    route: require("./base"),
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const baseRoutes = router;

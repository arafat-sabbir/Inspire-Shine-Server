import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { serviceRoutes } from "../modules/service/service.route";
import { slotRoutes } from "../modules/slot/slot.route";
import { bookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const routes = [
  {
    path: "",
    route: userRoutes,
  },
  {
    path: "",
    route: authRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "",
    route: slotRoutes,
  },
  {
    path: "",
    route: bookingRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const baseRoutes = router;

import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { serviceValidation } from "./service.validation";
import { serviceController } from "./service.controller";
import AuthorizeRequest from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/",
  AuthorizeRequest(USER_ROLE.admin),
  validateRequest(serviceValidation.createServiceValidationSchema),
  serviceController.create
);

export const serviceRoutes = router;

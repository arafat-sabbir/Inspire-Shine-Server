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

router.get("/:id", serviceController.getSingle);
router.get("/", serviceController.getAll);
router.put(
  "/:id",
  AuthorizeRequest(USER_ROLE.admin),
  validateRequest(serviceValidation.updateServiceValidationSchema),
  serviceController.updateSingle
);

export const serviceRoutes = router;

import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { serviceValidation } from "./service.validation";
import { serviceController } from "./service.controller";
const router = express.Router();

router.post(
  "/",
  validateRequest(serviceValidation.createServiceValidationSchema),
  serviceController.create
);

export const serviceRoutes = router;

import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { userValidation } from "../user/user.validation";

const router = express.Router();

router.post(
  "/auth/login",
  validateRequest(userValidation.loginUserSchema),
  authController.login
);
export const authRoutes = router;

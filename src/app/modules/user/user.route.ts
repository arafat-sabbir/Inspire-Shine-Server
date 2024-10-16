import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import AuthorizeRequest from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
const router = express.Router();
router.post(
  "/auth/signup",
  validateRequest(userValidation.createUserValidationSchema),
  userController.registerUser
);

router.post("/auth/update-user/:id", userController.updateUser);

router.get("/users/get-users",AuthorizeRequest(USER_ROLE.admin), userController.getAllUser);

export const userRoutes = router;

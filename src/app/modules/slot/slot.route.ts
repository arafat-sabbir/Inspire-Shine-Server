import express from "express";
import { slotController } from "./slot.controller";
import { slotValidation } from "./slot.validation";
import validateRequest from "../../middlewares/validateRequest";
import AuthorizeRequest from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();
router.post(
  "/services/slots",
  AuthorizeRequest(USER_ROLE.admin),
  validateRequest(slotValidation.createSlotValidationSchema),
  slotController.create
);

router.get("/slots/availability", slotController.getAvailableByQuery);
export const slotRoutes = router;

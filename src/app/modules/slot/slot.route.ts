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


router.patch("/update-slot/:id",AuthorizeRequest(USER_ROLE.admin),slotController.updateSlotStatus)


router.get("/slots/availability", slotController.getAvailableByQuery);

router.get('/slots/getAllSlots',slotController.getAllSlots);

export const slotRoutes = router;

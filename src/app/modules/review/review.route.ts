// Import Router from express
// Import Router from express
import { Router } from "express";

// Import controller from corresponding module
import { reviewControllers } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidation } from "./review.validation";
import AuthorizeRequest from "../../middlewares/auth";

// Initialize router
const router = Router();

router.post(
  "/create-review",
  AuthorizeRequest(),
  validateRequest(reviewValidation.createReviewSchema),
  reviewControllers.createReview
);

router.get("/get-reviews", reviewControllers.getAllReview);

const reviewRoutes = router;
export default reviewRoutes;

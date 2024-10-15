import { z } from "zod";

// Validation Schema For createReview
const createReviewSchema = z.object({
  body: z.object({
    review: z.string({ required_error: "Review is Required" }),
    rating: z.number({ required_error: "Rating is Required" }),
  }),
});

export const reviewValidation = {
  createReviewSchema,
};

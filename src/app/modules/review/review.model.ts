import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

// Define an interface representing a Review document

// Define the Review schema
const ReviewSchema: Schema<TReview> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Create the Review model
const ReviewModel = mongoose.model<TReview>("Review", ReviewSchema);

// Export the Review model
export default ReviewModel;

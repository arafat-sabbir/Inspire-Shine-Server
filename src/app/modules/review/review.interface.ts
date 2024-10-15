import { Types } from "mongoose";

export interface TReview {
  user: Types.ObjectId;
  review: string;
  rating: number;
}

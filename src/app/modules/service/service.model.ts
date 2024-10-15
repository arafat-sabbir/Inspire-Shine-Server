import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    category:{
      type: String,
      enum: ["basic wash", "interior detailing", "exterior shine", "engine cleaning", "headlight restoration", "full service"],
      required: true,
    },
  },
  { timestamps: true }
);
const ServiceModel = model<TService>("Service", serviceSchema);
export default ServiceModel;

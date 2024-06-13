import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>({
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isBooked: {
    type: String,
    enum: ["available", "booked", "canceled"],
    default: "available",
  },
});

const SlotModel = model<TSlot>("Slot", slotSchema);
export default SlotModel;

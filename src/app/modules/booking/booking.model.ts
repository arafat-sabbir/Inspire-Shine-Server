import { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingModel = new Schema<TBooking>({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  slot: { type: Schema.Types.ObjectId, ref: "Slot", required: true },
  vehicleType: {
    type: String,
    enum: [
      "car",
      "truck",
      "SUV",
      "van",
      "motorcycle",
      "bus",
      "electricVehicle",
      "hybridVehicle",
      "bicycle",
      "tractor",
    ],
    required: true,
  },
  vehicleBrand: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  manufacturingYear: { type: String, required: true },
  registrationPlate: { type: String, required: true },
});

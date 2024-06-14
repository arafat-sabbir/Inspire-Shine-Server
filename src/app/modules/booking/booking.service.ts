import SlotModel from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import BookingModel from "./booking.model";

import mongoose from "mongoose";

const create = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await BookingModel.create([payload], { session });
    await SlotModel.findByIdAndUpdate(
      payload.slot,
      { isBooked: "booked" },
      { session, new: true }
    );
    await session.commitTransaction();
    session.endSession();
    return result[0].populate("service customer slot");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getAll = async () => {
  const result = await BookingModel.find({}).populate("service customer slot");
  return result;
};
const bookingService = { create, getAll };
export default bookingService;

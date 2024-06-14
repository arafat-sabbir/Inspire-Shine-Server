import AppError from "../../errors/AppError";
import SlotModel from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import BookingModel from "./booking.model";

import mongoose from "mongoose";

const create = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await BookingModel.create([payload], { session });
    const updatedSlot = await SlotModel.findByIdAndUpdate(
      payload.slot,
      { isBooked: "booked" },
      { session, new: true }
    );
    if (!updatedSlot) throw new AppError(404, "No Data Found", []);
    await session.commitTransaction();
    session.endSession();
    return result[0].populate("service customer slot");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(404, "Booking Failed");
  }
};
const getAll = async () => {
  const result = await BookingModel.find({}).populate("service customer slot");
  if(!result || !result.length) throw new AppError(404, "No Data Found", []);
  return result;
};
const getSingle = async (id: string) => {
  console.log(id);
  const result = await BookingModel.find({ customer: id }).populate(
    "service customer slot"
  );
  if (!result || !result.length) throw new AppError(404, "No Data Found", []);
  return result;
};
const bookingService = { create, getAll, getSingle };
export default bookingService;

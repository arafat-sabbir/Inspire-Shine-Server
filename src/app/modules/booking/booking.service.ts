import { TBooking } from "./booking.interface";
import BookingModel from "./booking.model";

const create = async (payload: TBooking) => {
  console.log(payload);
  const result = (await BookingModel.create(payload)).populate(
    "service customer slot"
  );
  return result;
};
const getAll = async () => {
  const result = await BookingModel.find({}).populate("service customer slot");
  return result;
};
const bookingService = { create, getAll };
export default bookingService;

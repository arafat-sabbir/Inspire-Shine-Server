import { TBooking } from "./booking.interface";
import BookingModel from "./booking.model";

const create = async (payload: TBooking) => {
  const result = await BookingModel.create(payload);
  return result;
};

const bookingService = {create};
export default bookingService;

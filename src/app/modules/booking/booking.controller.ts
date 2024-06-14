import catchAsync from "../../utils/catchAsync";
import bookingService from "./booking.service";
import sendResponse from "../../utils/sendResponse";

const create = catchAsync(async (req, res) => {
  const { serviceId, slotId, ...others } = req.body;
  const data = {
    customer: req.user.userId,
    service: req.body.serviceId,
    slot: req.body.slotId,
    ...others,
  };
  const result = await bookingService.create(data);
  sendResponse(res, {
    message: "Booking successful",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await bookingService.getAll();
  sendResponse(res, {
    message: "Booking retrieved successfully",
    data: result,
  });
});

export const bookingController = { create,getAll };

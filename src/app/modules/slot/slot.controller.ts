import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotService } from "./slot.service";

const create = catchAsync(async (req, res) => {
  const result = await slotService.create(req.body);
  sendResponse(res, {
    message: "Slots created successfully",
    data: result,
  });
});

const getAvailableByQuery = catchAsync(async (req, res) => {
  const result = await slotService.getAvailableByQuery(req.query);
  sendResponse(res, {
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const slotController = { create,getAvailableByQuery };

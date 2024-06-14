import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotService } from "./slot.service";

const create = catchAsync(async (req, res) => {
  const result = await slotService.create(req.body);
  sendResponse(res, {
    message: "Service created successfully",
    data: result,
  });
});

const getByQuery = catchAsync(async (req, res) => {
  const result = await slotService.getByQuery(req.query);
  sendResponse(res, {
    message: "Service created successfully",
    data: result,
  });
});

export const slotController = { create,getByQuery };

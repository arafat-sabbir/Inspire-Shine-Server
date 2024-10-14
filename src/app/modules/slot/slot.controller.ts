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

const updateSlotStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await slotService.updateSlotStatus(id, req.body.status);
  sendResponse(res, {
    message: "Slot status updated successfully",
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await slotService.getAllSlots();
  sendResponse(res, {
    message: "All slots retrieved successfully",
    data: result,
  });
});

export const slotController = { create, getAvailableByQuery,updateSlotStatus,getAllSlots };

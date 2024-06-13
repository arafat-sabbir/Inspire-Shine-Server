import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { serviceService } from "./service.service";

const create = catchAsync(async (req, res) => {
  const service = await serviceService.create(req.body);
  sendResponse(res, {
    message: "Service created successfully",
    data: service,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await serviceService.getSingle(id);
  sendResponse(res, {
    message: "Service retrieved successfully",
    data: service,
  });
});

const getAll = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await serviceService.getAll();
  sendResponse(res, {
    message: "Service retrieved successfully",
    data: service,
  });
});
const updateSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await serviceService.updateSingle(id, req.body);
  sendResponse(res, {
    message: "Service updated successfully",
    data: service,
  });
});
export const serviceController = { create, getAll, getSingle, updateSingle };

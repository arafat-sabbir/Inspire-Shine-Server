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
export const serviceController = { create };

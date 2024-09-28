import catchAsync from "../../utils/catchAsync";
import authService from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  sendResponse(res, {
    message: "User logged in successfully",
    data: result,
  });
});
export const authController = { login };

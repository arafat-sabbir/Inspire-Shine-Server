import catchAsync from "../../utils/catchAsync";
import authService from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const login = catchAsync(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  sendResponse(res, {
    message: "User logged in successfully",
    token: token,
    data: { user },
  });
});
export const authController = { login };

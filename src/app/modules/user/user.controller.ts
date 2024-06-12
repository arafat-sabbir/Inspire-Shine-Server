import catchAsync from "src/app/utils/catchAsync";
import userService from "./user.service";
import sendResponse from "src/app/utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  sendResponse(res, {
    message: "User registered successfully",
    data: user,
  });
});

export const userController = { registerUser };

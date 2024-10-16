import catchAsync from "../../utils/catchAsync";
import userService from "./user.service";
import sendResponse from "../../utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  sendResponse(res, {
    message: "User registered successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const user = await userService.updateUser({
    id: id,
    role:data.role
  });
  sendResponse(res, {
    message: "User Updated successfully",
    data: user,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const users = await userService.getAllUser();
  sendResponse(res, {
    message: "All Users retrieved successfully",
    data: users,
  });
});

export const userController = { registerUser, updateUser, getAllUser };

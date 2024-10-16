import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import UserModel from "./user.model";

const register = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  const { password, ...others } = user.toObject();
  return others;
};

const updateUser = async (payload: {
  role:string
  id: string;
}) => {
  const userExist = await UserModel.findOne({ _id: payload.id });
  if(!userExist) throw new AppError(404, "No User Found", []);
  const updatedUser = await UserModel.findByIdAndUpdate(payload.id, payload, {
    new: true,
  });
  return updatedUser;
};


const getAllUser = async () => {
  const users = await UserModel.find();
  return users;
}

export default { register, updateUser,getAllUser };

import { TLoginUser, TUser } from "./user.interface";
import UserModel from "./user.model";

const register = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  return user;
};
const login = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email });
  return user;
};
export default { register, login };

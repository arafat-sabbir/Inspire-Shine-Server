import { TLoginUser, TUser } from "./user.interface";
import UserModel from "./user.model";

const register = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  const { password, ...others } = user.toObject();
  return others;
};
export default { register };

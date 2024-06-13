import config from "../../config";
import { TLoginUser } from "../user/user.interface";
import UserModel from "../user/user.model";
import { compareValue, generateToken } from "./auth.utils";

const login = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) throw new Error("User not found");
  const isMatch = await compareValue(payload.password, user.password);
  if (!isMatch) throw new Error("Password is incorrect");
  const token = generateToken(
    { role: user.role, userId: user.id },
    config.jwt_access_secret as string,
    process.env.JWT_EXPIRY!
  );
  return { user, token };
};

export default { login };

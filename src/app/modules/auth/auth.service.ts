import AppError from "../../errors/AppError";
import config from "../../config";
import { TLoginUser } from "../user/user.interface";
import UserModel from "../user/user.model";
import { compareValue, generateToken } from "./auth.utils";

const login = async (payload: TLoginUser) => {
  console.log(payload.email);
  const user = await UserModel.findOne({ email: payload.email }).select(
    "+password"
  );
  if (!user) throw new AppError(404, "No Data Found",[]);
  const isMatch = compareValue(payload.password, user.password);
  if (!isMatch) throw new Error("Password is incorrect");
  const { password, ...others } = user.toObject();
  const accessToken = generateToken(
    {  ...others},
    config.jwt_access_secret as string,
    "1d"
  );
  return { user: others,accessToken };
};

export default { login };

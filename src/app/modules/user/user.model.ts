import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "admin"] },
  address: { type: String, required: true },
});

const UserModel = mongoose.model<TUser>("User", userSchema);
export default UserModel;

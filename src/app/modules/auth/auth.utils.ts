import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const compareValue = (value: string, hash: string) => {
  return bcrypt.compareSync(value, hash);
};

const generateToken = (
  payload: Record<string, unknown>,
  secret: string,
  expiry: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  return token;
};

export { compareValue, generateToken };

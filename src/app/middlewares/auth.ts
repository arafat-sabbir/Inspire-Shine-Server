import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const AuthorizeRequest = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Get the authorization token from the request headers
    const token = req.headers.authorization?.split(" ")[1];
    // If no token is provided, throw an unauthorized error
    if (!token) {
      console.log("1");
      throw new AppError(401, "You have no access to this route");
    }
    try {
      jwt.verify(token, config.jwt_access_secret as string);
    } catch (error) {
      console.log("2");
      throw new AppError(401, "You have no access to this route");
    }
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded) {
      console.log("3");
      throw new AppError(401, "You have no access to this route");
    }
    const { role } = decoded;
    console.log(requiredRoles, role);
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      console.log("4");
      throw new AppError(401, "You have no access to this route");
    }
    req.user = decoded;
    next();
  });
};
export default AuthorizeRequest;

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
      throw new AppError(401, "Unauthorized Access");
    }
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    const { role } = decoded as JwtPayload;
    if (!decoded) throw new AppError(401, "Unauthorized Access");
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You have no access to this route!");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default AuthorizeRequest;

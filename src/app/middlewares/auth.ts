import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const AuthorizeRequest = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Get the authorization token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    // If no token is provided, throw an unauthorized error
    if (!token) {
      throw new AppError(401, 'Unauthorized Access');
    }
    jwt.verify(token, config.jwt_access_secret as string, (err: any, decoded: any) => {
      if (err) {
        throw new AppError(401, 'Unauthorized Access');
      }
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default AuthorizeRequest;

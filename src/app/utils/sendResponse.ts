import { Response } from "express";

interface TResponse<T> {
  message: string;
  token?: string;
  data: T;
  accessToken?: string;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: data.message,
    accessToken: data.token,
    data: data.data,
  });
};

export default sendResponse;

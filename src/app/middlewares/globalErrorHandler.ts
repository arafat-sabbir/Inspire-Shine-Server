import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { TGenericErrorResponse, TerrorMessages } from "../interface/error";
import config from "../config";
import AppError from "../errors/AppError";
import handleDuplicateError from "../errors/HandleDuplicateError";
import handleCastError from "../errors/HandleCastError";
import handleValidationError from "../errors/HandleValidationError";
import handleZodError from "../errors/HandleZodError";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res: Response<TGenericErrorResponse>,
  next
) => {
  // Set default values for status code, message, and error sources.
  let statusCode = 500;
  let stack = null;
  let message = "Something Went Wrong";
  let errorMessages: TerrorMessages = [
    {
      path: " ",
      message: "Something Went Wrong",
    },
  ];

  // Check the type of error and simplify it accordingly.
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages as TerrorMessages;
    stack = config.NODE_ENV === "development" && error.stack;
  } else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
    stack = config.NODE_ENV === "development" && error.stack;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages as TerrorMessages;
    stack = config.NODE_ENV === "development" && error.stack;
  } else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
    stack = config.NODE_ENV === "development" && error.stack;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = [
      {
        path: " ",
        message: error.message,
      },
    ];
    stack = config.NODE_ENV === "development" && error.stack;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = [
      {
        path: " ",
        message: error.message,
      },
    ];
    stack = config.NODE_ENV === "development" && error.stack;
  }

  // Return a JSON response with the error message and status code.
  if (!(error instanceof AppError) && !(error instanceof ZodError)) {
    return res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      ...(stack && { stack }),
    });
  } else if (error instanceof ZodError) {
    return res.status(statusCode).json({
      success: false,
      statusCode:400,
      message,
      errorMessages,
      ...(stack && { stack }),
    });
  } else {
    return res.status(statusCode).json({
      success: false,
      statusCode: error.statusCode,
      message,
      ...(error.data && { data: error.data }),
    });
  }
};

export default globalErrorHandler;

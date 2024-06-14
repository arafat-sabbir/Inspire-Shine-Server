import mongoose from 'mongoose';
import { TerrorMessages } from '../interface/error';

const handleDuplicateError = (err: any) => {
  const statusCode = 400;
  const errorMessages: TerrorMessages = [
    {
      path: err.keyValue,
      message: err.message,
    },
  ];
  return { statusCode, message: 'Duplicate Entry', errorMessages };
};

export default handleDuplicateError;

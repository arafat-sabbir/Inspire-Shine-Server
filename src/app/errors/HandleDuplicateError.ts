import mongoose from 'mongoose';
import { TerrorMessages } from '../interface/error';

const handleDuplicateError = (err: any) => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorMessages: TerrorMessages = [
    {
      path: err.keyValue,
      message: `${extractedMessage} already exists`,
    },
  ];
  return { statusCode, message: 'Duplicate Error', errorMessages };
};

export default handleDuplicateError;

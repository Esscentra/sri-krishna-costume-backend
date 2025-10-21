import { Response } from 'express';

export const successResponse = (res: Response, message: string, data?: any) => {
  return res.status(200).json({ success: true, message, data });
};

export const errorResponse = (res: Response, error: any, statusCode = 400) => {
  let message = 'Something went wrong';

  if (!error) message = 'Something went wrong';
  else if (typeof error === 'string') message = error;
  else if (error instanceof Error) message = error.message;
  else if (error?.message) message = error.message;

  return res.status(statusCode).json({ success: false, message });
};

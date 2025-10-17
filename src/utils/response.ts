import { Response } from 'express';

export const successResponse = (res: Response, message: string, data?: any) => {
  return res.status(200).json({ success: true, message, data });
};

export const errorResponse = (res: Response, error: any) => {
  const message =
    error instanceof Error ? error.message : 'Something went wrong';
  return res.status(400).json({ success: false, message });
};

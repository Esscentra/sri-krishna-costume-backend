import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ✅ Explicitly extend the full Express Request interface
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: Request & AuthRequest, // 👈 ensure full typing with headers included
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers?.authorization; // ✅ no TS error now

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized - Token missing' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    (req as AuthRequest).user = decoded; // ✅ assign safely
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

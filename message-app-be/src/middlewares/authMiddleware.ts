import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export interface UserRequest extends Request {
  user?: { id: number; email: string };
}

export const protectRoute = (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access restricted. Token is empty' });
  }
  const verifiedUser = verifyToken(token);
  req.user = verifiedUser;
  next();
};

// src/app/middlewares/auth.ts

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../utils/ApiError';
import User from '../modules/user/user.model';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        role: string;
        [key: string]: any;
      };
    }
  }
}

const auth = (...requiredRoles: string[]) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization token missing');
      }

      // 2. Verify token
      const verifiedUser = jwt.verify(token, config.jwt.secret as string) as JwtPayload;
      
      if (!verifiedUser || !verifiedUser._id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token payload');
      }

      // 3. Check if user still exists
      const user = await User.findById(verifiedUser._id).lean();
      
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }

      // 4. Check role authorization
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          `Required roles: ${requiredRoles.join(', ')}`
        );
      }

      // 5. Attach user to request
      req.user = {
        ...user,
        _id: user._id.toString(), // override ObjectId with string
        role: user.role           // explicitly override if needed
      };
      

      next();
    } catch (error) {
      next(error);
    }
  };


export default auth;
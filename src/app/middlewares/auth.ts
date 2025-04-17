import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../utils/ApiError";
import User from "../modules/user/user.model";

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

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Authorization token missing"
        );
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt.secret as string
      ) as JwtPayload;

      if (!verifiedUser || !verifiedUser._id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token payload");
      }

      const user = await User.findById(verifiedUser._id).lean();

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }

      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          `Required roles: ${requiredRoles.join(", ")}`
        );
      }

      req.user = {
        ...user,
        _id: user._id.toString(),
        role: user.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;

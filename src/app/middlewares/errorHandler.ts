import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = {
    statusCode: err.statusCode || 500,
    message: err.message,
    errors: err.errors,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(err.statusCode || 500).json(response);
};

export default errorHandler;

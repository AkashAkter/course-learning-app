import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { MongoServerError } from "mongodb";
import httpStatus from "http-status";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong!";
  let errorMessages = err.errorMessages || [];

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
    errorMessages = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  } else if (err instanceof MongoServerError && err.code === 11000) {
    statusCode = httpStatus.CONFLICT;
    message = "Duplicate Entry";
    const field = Object.keys(err.keyPattern)[0];
    errorMessages = [
      {
        path: field,
        message: `${field} already exists`,
      },
    ];
  } else if (err.name === "CastError") {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Cast Error";
    errorMessages = [
      {
        path: err.path,
        message: `Invalid ${err.path}: ${err.value}`,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
};

export default globalErrorHandler;

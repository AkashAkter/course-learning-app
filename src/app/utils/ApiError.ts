import httpStatus from "http-status";

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: Array<{ path: string; message: string }>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Array<{ path: string; message: string }>,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;

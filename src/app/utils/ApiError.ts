import httpStatus from "http-status";

class ApiError extends Error {
  statusCode: number;
  errorMessages: Array<{ path: string; message: string }>;

  constructor(
    statusCode: number,
    message: string,
    errorMessages: Array<{ path: string; message: string }> = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
  }
}

export default ApiError;

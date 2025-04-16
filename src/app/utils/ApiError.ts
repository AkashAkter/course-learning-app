// src/utils/ApiError.ts

import httpStatus from 'http-status';

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: Array<{ path: string; message: string }>; // Add this line for validation errors
  
  constructor(
    statusCode: number,
    message: string,
    errors?: Array<{ path: string; message: string }>,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors; // Assign the errors array
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
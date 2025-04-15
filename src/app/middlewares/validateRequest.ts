import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        next(
          new ApiError(
            httpStatus.BAD_REQUEST,
            "Validation Error",
            errorMessages
          )
        );
      } else {
        next(error);
      }
    }
  };
};

export default validateRequest;

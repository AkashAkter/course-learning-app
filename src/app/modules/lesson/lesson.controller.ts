import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/apiResponse";
import httpStatus from "http-status";
import { LessonService } from "./lesson.service";
import ApiError from "../../utils/ApiError";

const createLesson = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?._id)
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not authenticated");
  const result = await LessonService.createLesson(req.user._id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Lesson created successfully",
    data: result,
  });
});

const getLessonsByCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonService.getLessonsByCourse(req.params.courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lessons fetched successfully",
    data: result,
  });
});

const getSingleLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonService.getSingleLesson(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson fetched successfully",
    data: result,
  });
});

const updateLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonService.updateLesson(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson updated successfully",
    data: result,
  });
});

const deleteLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonService.deleteLesson(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson deleted successfully",
    data: result,
  });
});

export const LessonController = {
  createLesson,
  getLessonsByCourse,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};

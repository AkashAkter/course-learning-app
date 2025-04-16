import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/apiResponse';
import httpStatus from 'http-status';
import { LessonService } from './lesson.service';
import ApiError from '../../utils/ApiError';

const createLesson = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const teacherId = req.user._id as string;

  const result = await LessonService.createLesson(teacherId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Lesson created successfully',
    data: result,
  });
});

const getLessonsByCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const result = await LessonService.getLessonsByCourse(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lessons fetched successfully',
    data: result,
  });
});

export const LessonController = {
  createLesson,
  getLessonsByCourse,
};

// src/app/modules/student/student.controller.ts

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/apiResponse';
import { StudentService } from './student.service';

const enrollInCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const user = req.user as JwtPayload;
  
  const result = await StudentService.enrollInCourse(user.userId, courseId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student enrolled in course successfully',
    data: result,
  });
});

const getEnrolledCourses = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  
  const result = await StudentService.getEnrolledCourses(user.userId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses retrieved successfully',
    data: result,
  });
});

const getCourseProgress = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const user = req.user as JwtPayload;
  
  const result = await StudentService.getCourseProgress(user.userId, courseId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course progress retrieved successfully',
    data: result,
  });
});

const markTopicAsCompleted = catchAsync(async (req: Request, res: Response) => {
  const { topicId } = req.params;
  const user = req.user as JwtPayload;
  
  const result = await StudentService.markTopicAsCompleted(user.userId, topicId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Topic marked as completed successfully',
    data: result,
  });
});

const likeCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const user = req.user as JwtPayload;
  
  const result = await StudentService.likeCourse(user.userId, courseId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course liked successfully',
    data: result,
  });
});

const provideFeedback = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { rating, comment } = req.body;
  const user = req.user as JwtPayload;
  
  const result = await StudentService.provideFeedback(
    user.userId,
    courseId,
    rating,
    comment,
  );
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback provided successfully',
    data: result,
  });
});

const followTeacher = catchAsync(async (req: Request, res: Response) => {
  const { teacherId } = req.params;
  const user = req.user as JwtPayload;
  
  const result = await StudentService.followTeacher(user.userId, teacherId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher followed successfully',
    data: result,
  });
});

const unfollowTeacher = catchAsync(async (req: Request, res: Response) => {
  const { teacherId } = req.params;
  const user = req.user as JwtPayload;
  
  const result = await StudentService.unfollowTeacher(user.userId, teacherId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher unfollowed successfully',
    data: result,
  });
});

const getFollowedTeachers = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  
  const result = await StudentService.getFollowedTeachers(user.userId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Followed teachers retrieved successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = {
    page: req.query.page,
    limit: req.query.limit,
  };
  
  const filters = {
    searchTerm: req.query.searchTerm,
  };
  
  const result = await StudentService.getAllCourses(filters, paginationOptions);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const StudentController = {
  enrollInCourse,
  getEnrolledCourses,
  getCourseProgress,
  markTopicAsCompleted,
  likeCourse,
  provideFeedback,
  followTeacher,
  unfollowTeacher,
  getFollowedTeachers,
  getAllCourses,
};
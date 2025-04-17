import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/apiResponse";
import { CourseService } from "./course.service";
import ApiError from "../../utils/ApiError";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  // Ensure user is authenticated and is a teacher
  if (!req.user || req.user.role !== "teacher") {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Only teachers can create courses"
    );
  }

  const teacherId = req.user._id;
  const result = await CourseService.createCourse(teacherId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const paginationOptions = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
  };

  const result = await CourseService.getAllCourses(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getCoursesByTeacher = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }

  const result = await CourseService.getCoursesByTeacher(req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher courses retrieved successfully",
    data: result,
  });
});

const getCourseById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseService.getCourseById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieved successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }

  const { id } = req.params;
  const result = await CourseService.updateCourse(req.user._id, id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  if (!req.user?._id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }

  const { id } = req.params;
  const result = await CourseService.deleteCourse(req.user._id, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getCoursesByTeacher,
  getCourseById,
  updateCourse,
  deleteCourse,
};

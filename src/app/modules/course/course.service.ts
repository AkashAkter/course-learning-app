import httpStatus from "http-status";
import { Types } from "mongoose";
import ApiError from "../../utils/ApiError";
import User from "../user/user.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourse = async (teacherId: string, payload: TCourse) => {
  console.log("Creating course with teacher ID:", teacherId);

  if (!Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid teacher ID format");
  }

  const teacher = await User.findById(teacherId).lean();

  if (!teacher) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Teacher with ID ${teacherId} not found`
    );
  }

  if (teacher.role !== "teacher") {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Only teachers can create courses"
    );
  }

  const courseData = {
    ...payload,
    teacher: new Types.ObjectId(teacherId),
  };

  const result = await Course.create(courseData);
  return result;
};

const getAllCourses = async (
  filters: Record<string, unknown>,
  paginationOptions: Record<string, unknown>
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page = 1, limit = 10 } = paginationOptions;

  const skip = (Number(page) - 1) * Number(limit);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          description: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ],
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Course.find(whereConditions)
    .populate("teacher")
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Course.countDocuments(whereConditions);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

const getCoursesByTeacher = async (teacherId: string) => {
  const courses = await Course.find({ teacher: teacherId }).populate("teacher");
  return courses;
};

const getCourseById = async (id: string) => {
  const course = await Course.findById(id).populate("teacher");

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  return course;
};

const updateCourse = async (
  teacherId: string,
  courseId: string,
  payload: Partial<TCourse>
) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  if (course.teacher.toString() !== teacherId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this course"
    );
  }

  const result = await Course.findByIdAndUpdate(courseId, payload, {
    new: true,
  }).populate("teacher");

  return result;
};

const deleteCourse = async (teacherId: string, courseId: string) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  if (course.teacher.toString() !== teacherId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this course"
    );
  }

  const result = await Course.findByIdAndDelete(courseId);

  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getCoursesByTeacher,
  getCourseById,
  updateCourse,
  deleteCourse,
};

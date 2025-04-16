import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import { Lesson } from "./lesson.model";
import { TLesson } from "./lesson.interface";
import { Course } from "../course/course.model";

const createLesson = async (teacherId: string, payload: TLesson) => {
  const course = await Course.findById(payload.course);
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  if (course.teacher.toString() !== teacherId)
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not the owner of this course"
    );
  return Lesson.create(payload);
};

const getLessonsByCourse = async (courseId: string) => {
  return Lesson.find({ course: courseId });
};

const getSingleLesson = async (id: string) => {
  const lesson = await Lesson.findById(id);
  if (!lesson) throw new ApiError(httpStatus.NOT_FOUND, "Lesson not found");
  return lesson;
};

const updateLesson = async (id: string, payload: Partial<TLesson>) => {
  const updated = await Lesson.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) throw new ApiError(httpStatus.NOT_FOUND, "Lesson not found");
  return updated;
};

const deleteLesson = async (id: string) => {
  const deleted = await Lesson.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, "Lesson not found");
  return deleted;
};

export const LessonService = {
  createLesson,
  getLessonsByCourse,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};

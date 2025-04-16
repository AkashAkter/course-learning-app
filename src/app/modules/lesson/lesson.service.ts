import httpStatus from 'http-status';
import ApiError from '../../utils/ApiError';
import { Lesson } from './lesson.model';
import { TLesson } from './lesson.interface';
import { Course } from '../course/course.model';

const createLesson = async (teacherId: string, payload: TLesson) => {
  const course = await Course.findById(payload.course);
  if (!course) throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');

  if (course.teacher.toString() !== teacherId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not the owner of this course');
  }

  const lesson = await Lesson.create(payload);
  return lesson;
};

const getLessonsByCourse = async (courseId: string) => {
  return Lesson.find({ course: courseId });
};

export const LessonService = {
  createLesson,
  getLessonsByCourse,
};

// src/app/modules/course/course.route.ts

import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../user/user.interface';

const router = express.Router();
// Create a new course - only for teachers
router.post(
  '/',
  auth(ENUM_USER_ROLE.TEACHER),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);

// Get all courses - public route
router.get('/', CourseController.getAllCourses);

// ✅ Move this ABOVE `/:id`
router.get('/my-courses', auth(ENUM_USER_ROLE.TEACHER), CourseController.getCoursesByTeacher);

// ❗ Dynamic route should always come last
router.get('/:id', CourseController.getCourseById);

// Update a course - only for the teacher who created it
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.TEACHER),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);

// Delete a course - only for the teacher who created it
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.TEACHER),
  CourseController.deleteCourse
);

export const CourseRoutes = router;
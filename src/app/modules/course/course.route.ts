import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.interface";

const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.TEACHER),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse
);

router.get("/", CourseController.getAllCourses);

router.get(
  "/my-courses",
  auth(ENUM_USER_ROLE.TEACHER),
  CourseController.getCoursesByTeacher
);

router.get("/:id", CourseController.getCourseById);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.TEACHER),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.TEACHER),
  CourseController.deleteCourse
);

export const CourseRoutes = router;

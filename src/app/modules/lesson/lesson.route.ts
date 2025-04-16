import express from "express";
import { LessonController } from "./lesson.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import { createLessonZodSchema } from "./lesson.validation";

const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.TEACHER),
  validateRequest(createLessonZodSchema),
  LessonController.createLesson
);

router.get("/:courseId", LessonController.getLessonsByCourse);

export const LessonRoutes = router;

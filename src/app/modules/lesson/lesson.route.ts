import express from "express";
import { LessonController } from "./lesson.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import { LessonValidation } from "./lesson.validation";

const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.TEACHER),
  validateRequest(LessonValidation.createLessonZodSchema),
  LessonController.createLesson
);

router.get("/course/:courseId", LessonController.getLessonsByCourse);
router.get("/:id", LessonController.getSingleLesson);
router.put("/:id", auth(ENUM_USER_ROLE.TEACHER), LessonController.updateLesson);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.TEACHER),
  LessonController.deleteLesson
);

export const LessonRoutes = router;

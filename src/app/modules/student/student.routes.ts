import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { StudentController } from "./student.controller";
import { studentValidations } from "./student.validation";

const router = express.Router();

// Course enrollment routes
router.post(
  "/courses/:courseId/enroll",
  auth("student"),
  validateRequest(studentValidations.enrollCourse),
  StudentController.enrollInCourse
);

router.get(
  "/enrolled-courses",
  auth("student"),
  StudentController.getEnrolledCourses
);

// Course progress routes
router.get(
  "/courses/:courseId/progress",
  auth("student"),
  StudentController.getCourseProgress
);

router.post(
  "/topics/:topicId/complete",
  auth("student"),
  validateRequest(studentValidations.completeTopic),
  StudentController.markTopicAsCompleted
);

// Course feedback routes
router.post(
  "/courses/:courseId/like",
  auth("student"),
  StudentController.likeCourse
);

router.post(
  "/courses/:courseId/feedback",
  auth("student"),
  validateRequest(studentValidations.courseFeedback),
  StudentController.provideFeedback
);

// Teacher following routes
router.post(
  "/teachers/:teacherId/follow",
  auth("student"),
  StudentController.followTeacher
);

router.delete(
  "/teachers/:teacherId/unfollow",
  auth("student"),
  StudentController.unfollowTeacher
);

router.get(
  "/followed-teachers",
  auth("student"),
  StudentController.getFollowedTeachers
);

// Course discovery routes
router.get("/courses", auth("student"), StudentController.getAllCourses);

export const studentRoutes = router;

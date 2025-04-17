import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { CourseRoutes } from "./app/modules/course/course.route";
import globalErrorHandler from "./globalErrorHandler";
import { LessonRoutes } from "./app/modules/lesson/lesson.route";
import { TopicRoutes } from "./app/modules/topic/topic.route";
import { studentRoutes } from "./app/modules/student/student.routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", CourseRoutes);
app.use("/api/v1/lessons", LessonRoutes);
app.use("/api/v1/topic", TopicRoutes);
app.use("/api/v1/student", studentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Course Learning API is working!");
});

app.use(globalErrorHandler);

export default app;

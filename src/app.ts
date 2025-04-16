// src/app.ts

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import { CourseRoutes } from './app/modules/course/course.route';
import globalErrorHandler from './globalErrorHandler';
import { LessonRoutes } from './app/modules/lesson/lesson.route';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', CourseRoutes);
app.use('/api/v1/lessons', LessonRoutes);


// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Course Learning API is working!');
});

// Global error handler
app.use(globalErrorHandler);

export default app;
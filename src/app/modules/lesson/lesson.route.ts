import express from 'express';
import { LessonController } from './lesson.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../user/user.interface';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.TEACHER), LessonController.createLesson);
router.get('/:courseId', LessonController.getLessonsByCourse);

export const LessonRoutes = router;

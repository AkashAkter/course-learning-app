// src/app/modules/student/student.interface.ts

import { Types } from 'mongoose';

export type TEnrollment = {
  student: Types.ObjectId;
  course: Types.ObjectId;
  enrollmentDate: Date;
  progress: number; // percentage of completion
  completed: boolean;
};

export type TTopicProgress = {
  student: Types.ObjectId;
  topic: Types.ObjectId;
  completed: boolean;
  completedAt?: Date;
};

export type TFeedback = {
  student: Types.ObjectId;
  course: Types.ObjectId;
  rating: number;
  comment: string;
};

export type TTeacherFollowing = {
  student: Types.ObjectId;
  teacher: Types.ObjectId;
};

export type TQuizSubmission = {
  student: Types.ObjectId;
  topic: Types.ObjectId;
  answers: {
    questionId: Types.ObjectId;
    selectedOption: string;
  }[];
  score: number;
  submitted: boolean;
  submittedAt: Date;
};
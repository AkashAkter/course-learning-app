// src/app/modules/student/enrollment.model.ts

import { Schema, model } from 'mongoose';
import { TEnrollment } from './student.interface';

const enrollmentSchema = new Schema<TEnrollment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure a student can enroll in a course only once
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export const Enrollment = model<TEnrollment>('Enrollment', enrollmentSchema);
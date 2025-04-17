import { Schema, model } from "mongoose";
import { TTeacherFollowing } from "./student.interface";

const teacherFollowingSchema = new Schema<TTeacherFollowing>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure a student can follow a teacher only once
teacherFollowingSchema.index({ student: 1, teacher: 1 }, { unique: true });

export const TeacherFollowing = model<TTeacherFollowing>(
  "TeacherFollowing",
  teacherFollowingSchema
);

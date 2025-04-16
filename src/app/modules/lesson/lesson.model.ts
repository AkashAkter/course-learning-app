import { Schema, model } from "mongoose";
import { LessonModel, ILesson } from "./lesson.interface";

const lessonSchema = new Schema<ILesson, LessonModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index for better query performance
lessonSchema.index({ course: 1 });

export const Lesson = model<ILesson, LessonModel>("Lesson", lessonSchema);

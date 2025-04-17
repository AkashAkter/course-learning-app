// src/app/modules/student/topicProgress.model.ts

import { Schema, model } from "mongoose";
import { TTopicProgress } from "./student.interface";

const topicProgressSchema = new Schema<TTopicProgress>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure unique topic progress records
topicProgressSchema.index({ student: 1, topic: 1 }, { unique: true });

export const TopicProgress = model<TTopicProgress>(
  "TopicProgress",
  topicProgressSchema
);

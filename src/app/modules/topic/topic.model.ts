import { Schema, model } from "mongoose";
import { TTopic, TopicModel } from "./topic.interface";

const topicSchema = new Schema<TTopic, TopicModel>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
  },
  { timestamps: true }
);

export const Topic = model<TTopic, TopicModel>("Topic", topicSchema);

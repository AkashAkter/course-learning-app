// First, update your Topic interface with proper population types
// src/app/modules/topic/topic.interface.ts

import { Types, Model, Document } from "mongoose";
import { ILesson } from "../lesson/lesson.interface";
import { TCourse } from "../course/course.interface";

export interface ITopic extends Document {
  title: string;
  content: string;
  lesson: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type TTopic = Omit<ITopic, keyof Document>;

export type TopicModel = Model<ITopic>;

// Add interfaces for populated documents
export interface IPopulatedLesson extends Omit<ILesson, 'course'> {
  course: TCourse & { _id: Types.ObjectId };
}

export interface IPopulatedTopic extends Omit<ITopic, 'lesson'> {
  lesson: IPopulatedLesson;
}
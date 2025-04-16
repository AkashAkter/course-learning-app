import { Types, Model, Document } from "mongoose";

export interface ILesson extends Document {
  title: string;
  description: string;
  course: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type TLesson = Omit<ILesson, keyof Document>;

export type LessonModel = Model<ILesson>;

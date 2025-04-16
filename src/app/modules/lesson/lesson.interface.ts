import { Types, Model } from 'mongoose';

export type TLesson = {
  title: string;
  description: string;
  course: Types.ObjectId;
};

export type LessonModel = Model<TLesson>;

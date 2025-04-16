
import { Model, Types } from 'mongoose';

export type TCourse = {
  title: string;
  description: string;
  teacher: Types.ObjectId;
  views?: number;
  likes?: number;
  students?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type CourseModel = Model<TCourse>;
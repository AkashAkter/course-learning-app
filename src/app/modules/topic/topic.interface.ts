// src/app/modules/topic/topic.interface.ts
import { Model, Types } from "mongoose";

export type TTopic = {
  title: string;
  content: string;
  lesson: Types.ObjectId;
};

export type TopicModel = Model<TTopic>;

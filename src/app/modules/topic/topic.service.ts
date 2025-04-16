// src/app/modules/topic/topic.service.ts
import httpStatus from "http-status";
import ApiError from "../../utils/ApiError";
import { Topic } from "./topic.model";
import { TTopic } from "./topic.interface";
import { Lesson } from "../lesson/lesson.model";

const createTopic = async (payload: TTopic) => {
  const lesson = await Lesson.findById(payload.lesson);
  if (!lesson) throw new ApiError(httpStatus.NOT_FOUND, "Lesson not found");

  const topic = await Topic.create(payload);
  return topic;
};

const getTopicsByLesson = async (lessonId: string) => {
  return Topic.find({ lesson: lessonId });
};

const updateTopic = async (id: string, payload: Partial<TTopic>) => {
  const topic = await Topic.findByIdAndUpdate(id, payload, { new: true });
  if (!topic) throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
  return topic;
};

const deleteTopic = async (id: string) => {
  const topic = await Topic.findByIdAndDelete(id);
  if (!topic) throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
  return topic;
};

export const TopicService = {
  createTopic,
  getTopicsByLesson,
  updateTopic,
  deleteTopic,
};

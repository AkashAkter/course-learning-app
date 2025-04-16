// src/app/modules/topic/topic.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/apiResponse";
import httpStatus from "http-status";
import { TopicService } from "./topic.service";

const createTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicService.createTopic(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Topic created successfully",
    data: result,
  });
});

const getTopicsByLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicService.getTopicsByLesson(req.params.lessonId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topics fetched successfully",
    data: result,
  });
});

const updateTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicService.updateTopic(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic updated successfully",
    data: result,
  });
});

const deleteTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicService.deleteTopic(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic deleted successfully",
    data: result,
  });
});

export const TopicController = {
  createTopic,
  getTopicsByLesson,
  updateTopic,
  deleteTopic,
};

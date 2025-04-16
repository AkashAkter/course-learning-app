// src/app/modules/topic/topic.route.ts
import express from "express";
import { TopicController } from "./topic.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createTopicZodSchema, updateTopicZodSchema } from "./topic.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createTopicZodSchema),
  TopicController.createTopic
);
router.get("/:lessonId", TopicController.getTopicsByLesson);
router.patch(
  "/:id",
  validateRequest(updateTopicZodSchema),
  TopicController.updateTopic
);
router.delete("/:id", TopicController.deleteTopic);

export const TopicRoutes = router;

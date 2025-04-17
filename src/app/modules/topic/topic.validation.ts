import { z } from "zod";

export const createTopicZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    lesson: z.string().min(1, "Lesson ID is required"),
  }),
});

export const updateTopicZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

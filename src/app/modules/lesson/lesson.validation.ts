import { z } from "zod";

export const createLessonZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    course: z.string({
      required_error: "Course ID is required",
    }),
  }),
});

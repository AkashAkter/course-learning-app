import { z } from "zod";

const enrollCourse = z.object({
  params: z.object({
    courseId: z.string({
      required_error: "Course ID is required",
    }),
  }),
});

const completeTopic = z.object({
  params: z.object({
    topicId: z.string({
      required_error: "Topic ID is required",
    }),
  }),
});

const courseFeedback = z.object({
  params: z.object({
    courseId: z.string({
      required_error: "Course ID is required",
    }),
  }),
  body: z.object({
    rating: z
      .number({
        required_error: "Rating is required",
      })
      .min(1)
      .max(5),
    comment: z.string({
      required_error: "Comment is required",
    }),
  }),
});

const submitQuiz = z.object({
  params: z.object({
    topicId: z.string({
      required_error: "Topic ID is required",
    }),
  }),
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.string({
          required_error: "Question ID is required",
        }),
        selectedOption: z.string({
          required_error: "Selected option is required",
        }),
      })
    ),
  }),
});

export const studentValidations = {
  enrollCourse,
  completeTopic,
  courseFeedback,
  submitQuiz,
};

import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }),
    role: z.enum(["student", "teacher"], {
      required_error: "Role is required",
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
};

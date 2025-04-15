import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const userRoutes = router;

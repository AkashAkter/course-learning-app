import express from "express";
import cors from "cors";
import globalErrorHandler from "./globalErrorHandler";
import { userRoutes } from "./app/modules/user/user.route";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);

// Global error handler
app.use(globalErrorHandler);

export default app;

import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(config.database_url as string, {
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      w: "majority",
    });

    console.log("Database connected successfully");

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

bootstrap();

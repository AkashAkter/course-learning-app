import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

export default {
  port: parseInt(process.env.PORT || "3000"),
  env: process.env.NODE_ENV || "development",
  database_url: process.env.DATABASE_URL as string,
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12"),
};

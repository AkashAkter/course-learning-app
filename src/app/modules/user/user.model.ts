import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config";
import { IUser, IUserMethods, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ["student", "teacher"], required: true },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Check if password matches
userSchema.methods.isPasswordMatched = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if user exists
userSchema.statics.isUserExist = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
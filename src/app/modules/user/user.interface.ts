import mongoose, { Types } from "mongoose";

export type TUserRole = "student" | "teacher";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
}

export interface IUserMethods {
  isPasswordMatched(password: string): Promise<boolean>;
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<
    Pick<IUser, "email" | "password" | "role"> & { _id: Types.ObjectId }
  >;
} & mongoose.Model<IUser, object, IUserMethods>;

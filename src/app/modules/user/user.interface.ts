import mongoose, { Types } from "mongoose";

export enum ENUM_USER_ROLE {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export type TUserRole = "student" | "teacher";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  followingTeachers?: Types.ObjectId[];
  enrolledCourses?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginUserInput {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  accessToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: TUserRole;
  };
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
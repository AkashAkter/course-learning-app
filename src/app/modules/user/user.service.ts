import { IUser } from "./user.interface";
import User from "./user.model";
import ApiError from "../../utils/ApiError";
import httpStatus from "http-status";

const createUser = async (userData: IUser): Promise<IUser> => {
  // Check if user already exists
  const existingUser = await User.isUserExist(userData.email);
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, "Email already exists");
  }

  const user = await User.create(userData);
  return user;
};

export const UserService = {
  createUser,
};

import httpStatus from "http-status";
import { Types } from "mongoose";
import ApiError from "../../utils/ApiError";
import { Course } from "../course/course.model";
import { Lesson } from "../lesson/lesson.model";
import { Topic } from "../topic/topic.model";
import User from "../user/user.model";
import { Enrollment } from "./enrollment.model";
import { Feedback } from "./feedback.model";
import { TeacherFollowing } from "./teacherFollowing.model";
import { TopicProgress } from "./topicProgress.model";
import { IPopulatedTopic } from "../topic/topic.interface";

// Enroll in a course
const enrollInCourse = async (studentId: string, courseId: string) => {
  // Check if the student exists
  const student = await User.findById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }

  // Check if the student role is actually student
  if (student.role !== "student") {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Only students can enroll in courses"
    );
  }

  // Check if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Check if the student is already enrolled in the course
  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (existingEnrollment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Student is already enrolled in this course"
    );
  }

  // Create enrollment record
  const enrollment = await Enrollment.create({
    student: studentId,
    course: courseId,
    enrollmentDate: new Date(),
  });

  // Update course students array
  await Course.findByIdAndUpdate(courseId, {
    $push: { students: studentId },
  });

  return enrollment;
};

// Get all enrolled courses for a student
const getEnrolledCourses = async (studentId: string) => {
  // Check if the student exists
  const student = await User.findById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }

  const enrollments = await Enrollment.find({ student: studentId })
    .populate({
      path: "course",
      populate: {
        path: "teacher",
        select: "name email",
      },
    })
    .sort({ enrollmentDate: -1 });

  return enrollments;
};

// Get course progress for a student
const getCourseProgress = async (studentId: string, courseId: string) => {
  // Check if the student is enrolled in the course
  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (!enrollment) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Student is not enrolled in this course"
    );
  }

  // Get all topics for the course
  const lessons = await Lesson.find({ course: courseId });

  // Get IDs of all topics in the course
  const lessonIds = lessons.map((lesson) => lesson._id);
  const topics = await Topic.find({ lesson: { $in: lessonIds } });

  // Get completed topics
  const completedTopics = await TopicProgress.find({
    student: studentId,
    topic: { $in: topics.map((topic) => topic._id) },
    completed: true,
  });

  // Calculate progress percentage
  const totalTopics = topics.length;
  const completedTopicsCount = completedTopics.length;
  const progressPercentage =
    totalTopics > 0
      ? Math.round((completedTopicsCount / totalTopics) * 100)
      : 0;

  // Update enrollment progress
  enrollment.progress = progressPercentage;
  enrollment.completed = progressPercentage === 100;
  await enrollment.save();

  return {
    enrollment,
    totalTopics,
    completedTopics: completedTopicsCount,
    progressPercentage,
  };
};

// Mark a topic as completed
const markTopicAsCompleted = async (studentId: string, topicId: string) => {
  // Check if the topic exists
  const topic = await Topic.findById(topicId).populate({
    path: "lesson",
    populate: {
      path: "course",
    },
  });

  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, "Topic not found");
  }

  // Cast the populated topic to the correct interface
  const populatedTopic = topic as unknown as IPopulatedTopic;

  // Now we can safely access the course ID
  const courseId = populatedTopic.lesson.course._id;

  // Check if the student is enrolled in the related course
  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (!enrollment) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Student is not enrolled in this course"
    );
  }

  // Update or create topic progress
  const topicProgress = await TopicProgress.findOneAndUpdate(
    {
      student: studentId,
      topic: topicId,
    },
    {
      completed: true,
      completedAt: new Date(),
    },
    {
      new: true,
      upsert: true,
    }
  );

  // Update course progress
  await getCourseProgress(studentId, courseId.toString());

  return topicProgress;
};

// Like a course
const likeCourse = async (studentId: string, courseId: string) => {
  // Check if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Check if the student is enrolled in the course
  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (!enrollment) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Only enrolled students can like a course"
    );
  }

  // Increment course likes
  course.likes = (course.likes || 0) + 1;
  await course.save();

  return course;
};

// Provide feedback for a course
const provideFeedback = async (
  studentId: string,
  courseId: string,
  rating: number,
  comment: string
) => {
  // Check if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Check if the student is enrolled in the course
  const enrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (!enrollment) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Only enrolled students can provide feedback"
    );
  }

  // Check if the student has already provided feedback
  const existingFeedback = await Feedback.findOne({
    student: studentId,
    course: courseId,
  });

  if (existingFeedback) {
    // Update existing feedback
    existingFeedback.rating = rating;
    existingFeedback.comment = comment;
    await existingFeedback.save();
    return existingFeedback;
  }

  // Create new feedback
  const feedback = await Feedback.create({
    student: studentId,
    course: courseId,
    rating,
    comment,
  });

  return feedback;
};

// Follow a teacher
const followTeacher = async (studentId: string, teacherId: string) => {
  // Check if the teacher exists
  const teacher = await User.findById(teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, "Teacher not found");
  }

  // Check if the user is actually a teacher
  if (teacher.role !== "teacher") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You can only follow users with teacher role"
    );
  }

  // Check if already following
  const existingFollow = await TeacherFollowing.findOne({
    student: studentId,
    teacher: teacherId,
  });

  if (existingFollow) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You are already following this teacher"
    );
  }

  // Create follow record
  const follow = await TeacherFollowing.create({
    student: studentId,
    teacher: teacherId,
  });

  return follow;
};

// Unfollow a teacher
const unfollowTeacher = async (studentId: string, teacherId: string) => {
  // Check if following exists
  const following = await TeacherFollowing.findOne({
    student: studentId,
    teacher: teacherId,
  });

  if (!following) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "You are not following this teacher"
    );
  }

  // Delete follow record
  await TeacherFollowing.findByIdAndDelete(following._id);

  return { message: "Teacher unfollowed successfully" };
};

// Get all teachers followed by a student
const getFollowedTeachers = async (studentId: string) => {
  const followings = await TeacherFollowing.find({
    student: studentId,
  }).populate({
    path: "teacher",
    select: "name email",
  });

  return followings;
};

// Get all available courses for students
const getAllCourses = async (
  filters: Record<string, unknown>,
  paginationOptions: Record<string, unknown>
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page = 1, limit = 10 } = paginationOptions;

  const skip = (Number(page) - 1) * Number(limit);

  const andConditions = [];

  // Search implementation
  if (searchTerm) {
    andConditions.push({
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          description: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ],
    });
  }

  // Filters implementation
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Course.find(whereConditions)
    .populate({
      path: "teacher",
      select: "name email",
    })
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Course.countDocuments(whereConditions);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

export const StudentService = {
  enrollInCourse,
  getEnrolledCourses,
  getCourseProgress,
  markTopicAsCompleted,
  likeCourse,
  provideFeedback,
  followTeacher,
  unfollowTeacher,
  getFollowedTeachers,
  getAllCourses,
};

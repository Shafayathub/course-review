import { RequestHandler } from 'express';
import { CourseServices } from './course.service';

const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await CourseServices.createCourseIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCourses: RequestHandler = async (req, res, next) => {
  try {
    const result = await CourseServices.getAllCoursesFromDB();
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllReviewsWithSingleCourse: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { courseId } = req.params;
  try {
    const result =
      await CourseServices.getAllReviewsWithSingleCourseFromDB(courseId);

    res.status(200).json({
      success: true,
      message: 'Course and Reviews retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getTheBestCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await CourseServices.getTheBestCourseFromDB();

    res.status(200).json({
      success: true,
      message: 'Best course retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getAllReviewsWithSingleCourse,
  getTheBestCourse,
};

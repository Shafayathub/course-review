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

export const CourseControllers = {
  createCourse,
  getAllCourses,
};

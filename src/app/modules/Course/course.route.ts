import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/courses', CourseControllers.getAllCourses);
router.get(
  '/courses/:courseId/reviews',
  CourseControllers.getAllReviewsWithSingleCourse,
);
router.get('/course/best', CourseControllers.getTheBestCourse);

export const CourseRoutes = router;

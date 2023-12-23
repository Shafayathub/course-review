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

export const CourseRoutes = router;

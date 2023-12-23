import AppError from '../../errors/appError';
import { Category } from '../Category/catagory.model';
import { TCourse } from './course.interface';
import { Course } from './cousre.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const { startDate } = payload;
  const { endDate } = payload;
  const { categoryId } = payload;
  const inputedObj = { ...payload };

  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDifferenceInMiliSec = Math.abs(start.getTime() - end.getTime());

  // milisec/100=sec/60=min/60=hour/24=day/7=weeks

  const weeks = Math.ceil(timeDifferenceInMiliSec / (1000 * 60 * 60 * 24 * 7));

  const outPutObj = { durationInWeeks: weeks, ...inputedObj };

  const isCategoryIdExists = await Category.findById(categoryId);

  if (isCategoryIdExists) {
    const result = await Course.create(outPutObj);
    return result;
  } else {
    throw new AppError(`${categoryId} is not a valid ID!`, 'Invalid ID');
  }
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find();
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
};

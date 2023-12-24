import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import { Category } from '../Category/catagory.model';
import { TCourse } from './course.interface';
import { Course } from './cousre.model';
import { Review } from '../Review/review.model';

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

const getAllCoursesFromDB = async (payload: Record<string, unknown>) => {
  // console.log(payload);

  const allCourses = Course.find();

  // paginating
  const limit = Number(payload?.limit || 10);
  let skip: number = 0;

  if (payload?.page) {
    const page: number = Number(payload?.page || 1);

    skip = Number((page - 1) * limit);
  }
  const paginateQuery = allCourses.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  // sorting
  let sortBy = 'createdAt';
  let sortOrder = 'desc';

  if (payload?.sortBy) {
    sortBy = payload.sortBy as string;
  }

  if (payload?.sortOrder) {
    sortOrder = payload?.sortOrder === 'asc' ? sortBy : `-${sortBy}`;
  }

  const sortQuery = limitQuery.sort(sortOrder);

  // filtering
  const queryObj = { ...payload };
  const excluseFields = ['page', 'limit', 'sortBy', 'sortOrder'];
  excluseFields.forEach((e) => delete queryObj[e]);
  //
  // console.log(queryObj);
  //
  let minPrice = 0;
  let maxPrice = 100000000;
  if (queryObj?.minPrice) {
    minPrice = Number(queryObj.minPrice);
  }

  const minPriceQuery = sortQuery.find({ price: { $gt: minPrice } });

  if (queryObj?.maxPrice) {
    maxPrice = Number(queryObj?.maxPrice);
  }

  const maxPriceQuery = minPriceQuery.find({ price: { $lt: maxPrice } });

  // let tags = {};
  // if (queryObj?.tags) {
  //   tags = {
  //     name: queryObj?.tags,
  //   };
  // }

  if (queryObj?.tags) {
    const tag = queryObj.tags;
    const tagQuery = await maxPriceQuery.find(
      {},
      {
        tags: { name: { $elemMatch: { tag } } },
      },
    );
    return tagQuery;
  }

  // const result = await maxPriceQuery.find(queryObj);

  // return result;
};

const getAllReviewsWithSingleCourseFromDB = async (id: string) => {
  const result = await Course.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
  ]);
  return result;
};

const getTheBestCourseFromDB = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        reviewCount: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
    {
      $sort: { Average: -1 },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $project: { reviewCount: 1, averageRating: 1, course: 1, _id: 0 },
    },
  ]);
  const formatedResult = result[0];
  const { reviewCount, averageRating, course } = formatedResult;
  // console.log(reviewCount, averageRating, course[0]);

  return {
    reviewCount,
    averageRating: parseFloat(averageRating),
    course: course[0],
  };
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getAllReviewsWithSingleCourseFromDB,
  getTheBestCourseFromDB,
};

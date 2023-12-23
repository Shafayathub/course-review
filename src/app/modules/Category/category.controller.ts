import { RequestHandler } from 'express';
import { CategoryServices } from './catagory.service';

const createCategory: RequestHandler = async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: result,
  });
};

const getAllCategories: RequestHandler = async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB();

  res.status(200).json({
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
};

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};

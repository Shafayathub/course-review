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

export const CategoryControllers = {
  createCategory,
};

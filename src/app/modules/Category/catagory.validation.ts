import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  name: z.string(),
});

export const categoryValidations = {
  createCategoryValidationSchema,
};

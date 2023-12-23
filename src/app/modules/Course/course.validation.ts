import { z } from 'zod';

const createTagsValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const createDetailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const createCourseValidationSchema = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number(),
  tags: z.array(createTagsValidationSchema),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().int().optional(),
  details: createDetailsValidationSchema,
});

export const CourseValidations = {
  createCourseValidationSchema,
};

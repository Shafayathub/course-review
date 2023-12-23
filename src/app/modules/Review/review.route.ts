import express from 'express';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post('/', ReviewControllers.createReview);

export const ReviewRoutes = router;

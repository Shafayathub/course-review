import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CategoryRoutes } from './app/modules/Category/category.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { CourseRoutes } from './app/modules/Course/course.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/categories', CategoryRoutes);
app.use('/api', CourseRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello assingment 3!');
});

// global error handler
app.use(globalErrorHandler);

export default app;

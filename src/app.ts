import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CategoryControllers } from './app/modules/Category/category.controller';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/categories', CategoryControllers.createCategory);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello assingment 3!');
});

export default app;

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CategoryRoutes } from './app/modules/Category/category.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/categories', CategoryRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello assingment 3!');
});

export default app;

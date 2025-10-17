import express, { Application } from 'express';
import cors from 'cors';
import adminRoutes from './routes/admin.routes';
import categoryRoutes from './routes/category.routes';
import morgan from 'morgan';

const app: Application = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);

// ✅ Health check route
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🎭 Sri Krishna Costume Backend API is running',
  });
});

export default app;

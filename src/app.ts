import express, { Application } from 'express';
import cors from 'cors';
import adminRoutes from './routes/admin.routes';
import categoryRoutes from './routes/category.routes';
import googleReviewRoutes from './routes/googleReview.routes';
import CostumeRoutes from './routes/costume.routes';
import morgan from 'morgan';

const app: Application = express();

// ✅ Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://srikrishnacostume.vercel.app",
      "https://srikrishnacostumes.vercel.app",
      "https://www.skcostumes.com/",
      "https://www.skcostumes.com",
      "https://www.skcostumes.com",
      "www.skcostumes.com/",
      "https://skcostumes.com",
      "https://skcostumes.com/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ✅ Routes
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/google-reviews', googleReviewRoutes);
app.use('/api/costume', CostumeRoutes);

// ✅ Health check route
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🎭 Sri Krishna Costume Backend API is running',
  });
});

export default app;

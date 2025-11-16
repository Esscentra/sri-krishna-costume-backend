import { Router } from 'express';
import { getGoogleReviews } from '../controllers/googleReview.controller';

const router = Router();

// ✅ Public route to fetch reviews
router.get('/', getGoogleReviews);

export default router;

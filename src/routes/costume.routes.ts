import { Router } from 'express';
import {
  createCostume,
  getAllCostumes,
  getSingleCostume,
  updateCostume,
  deleteCostume,
} from '../controllers/costume.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

// ✅ Create Costume
router.post('/', authenticate, upload.array('files'), createCostume);

// ✅ Get All Costumes
router.get('/', getAllCostumes);

// ✅ Get Single Costume
router.get('/:id', getSingleCostume);

// ✅ Update Costume
router.put('/:id', authenticate, upload.array('files'), updateCostume);

// ✅ Delete Costume
router.delete('/:id', authenticate, deleteCostume);

export default router;

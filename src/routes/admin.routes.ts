import { Router } from 'express';
import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  deleteAdmin,
} from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes
router.get('/', authenticate, getAllAdmins);
router.delete('/:id', authenticate, deleteAdmin);

export default router;

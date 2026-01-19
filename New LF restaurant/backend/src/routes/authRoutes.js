import express from 'express';
import { login, signup, updateProfile, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.put('/profile', protect, updateProfile);
router.get('/me', protect, getMe);

export default router;

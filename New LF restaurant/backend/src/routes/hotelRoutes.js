import express from 'express';
import { createHotel, getHotels, getHotelById, deleteHotel, suspendHotel, updateHotel } from '../controllers/hotelController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, adminOnly, createHotel)
    .get(getHotels);

router.route('/:id')
    .get(getHotelById)
    .delete(protect, adminOnly, deleteHotel)
    .put(protect, updateHotel);

router.put('/:id/suspend', protect, adminOnly, suspendHotel);

export default router;

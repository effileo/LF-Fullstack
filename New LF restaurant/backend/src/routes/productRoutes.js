import express from 'express';
import { createProduct, deleteProduct, getProductsByHotel, updateProduct } from '../controllers/productController.js';
import { protect, hotelAdminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, hotelAdminOnly, createProduct);
router.put('/:id', protect, hotelAdminOnly, updateProduct);
router.delete('/:id', protect, hotelAdminOnly, deleteProduct);
router.get('/hotel/:hotelId', getProductsByHotel);

export default router;

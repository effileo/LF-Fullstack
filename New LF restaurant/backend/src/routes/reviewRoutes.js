import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/reviews - Create a review
router.post('/', protect, async (req, res) => {
    const { hotelId, rating, comment } = req.body;
    const userId = req.user.id;

    try {
        // Simple check if user has already reviewed? Valid requirement? 
        // For now allow multiple or just create.

        const review = await prisma.review.create({
            data: {
                hotelId,
                rating: parseInt(rating),
                comment,
                // If we want to link review to user, we need to update schema. 
                // Currently Review model doesn't have userId relation in the schema provided earlier.
                // Checking Schema: `hotelId`, `rating`, `comment`. No `userId`.
                // So we just create it linked to Hotel.
            }
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: 'Could not submit review', error: error.message });
    }
});

// GET /api/reviews/:hotelId - Get reviews for a hotel
router.get('/:hotelId', async (req, res) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { hotelId: req.params.hotelId },
            orderBy: { createdAt: 'desc' },
            take: 10 // Limit to recent 10 
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

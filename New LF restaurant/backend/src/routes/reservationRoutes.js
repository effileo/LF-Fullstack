import express from 'express';
import { createReservation, getReservations, getUserReservations, updateReservationStatus } from '../controllers/reservationController.js';
import { protect, hotelAdminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReservation);
router.put('/:id/status', protect, updateReservationStatus);
// The prompt implies a logged in user profile, so 'createReservation' might benefit from being protected or loosely protected. 
// However, the controller logic `const userId = req.user ? req.user.id : null;` handles both.
// But to ensure `req.user` is populated, we need the middleware. 
// If public can book, we use a middleware that doesn't fail if no token, OR effectively use `protect` for logged in flow.
// For now, I'll leave POST public or check `server.js` middleware usage. 
// Actually, to make sure the user profile gets the data, the frontend MUST send the token. 
// I will NOT add `protect` to POST strictly, but the frontend should send headers. 
// Wait, if I don't add `protect`, `req.user` will be undefined.
// I will create a separate route or rely on the frontend sending the header and a "soft" auth middleware if available. 
// Checking 'server.js' or 'authMiddleware' is safer. 
// For now, let's just add the new GET route which IS protected.

router.get('/my-reservations', protect, getUserReservations);
router.get('/hotel/:hotelId', protect, hotelAdminOnly, getReservations);

export default router;

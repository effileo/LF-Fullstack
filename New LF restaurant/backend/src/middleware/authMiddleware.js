import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                include: { hotel: true }
            });

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // Map hotelId for convenience
            if (user.hotel) {
                user.hotelId = user.hotel.id;
            }

            console.log(`[AuthDebug] User: ${user.email}, Role: ${user.role}, Hotel: ${user.hotel ? user.hotel.name : 'NULL'}, HotelID: ${user.hotelId}`);
            req.user = user;
            next();
        } catch (error) {
            console.error('Auth Error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'SUPER_ADMIN') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as super admin' });
    }
};

export const hotelAdminOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'HOTEL_ADMIN' || req.user.role === 'SUPER_ADMIN')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as hotel admin' });
    }
};

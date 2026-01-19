
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Fallback to what env probably is if missing

async function testAuth() {
    console.log('--- TEST START ---');
    const email = 'curllog@example.com';

    // 1. Find User
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.log('User NOT FOUND in DB');
        return;
    }
    console.log('1. User Found:', user.id);

    // 2. Generate Token (simulate login)
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    console.log('2. Token Generated');

    // 3. Verify Token (simulate protect middleware)
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('3. Token Decoded ID:', decoded.id);

        if (decoded.id !== user.id) {
            console.error('MISMATCH! Decoded ID != User ID');
        } else {
            console.log('MATCH! Decoded ID == User ID');
        }

        // 4. DB Lookup using Decoded ID
        const foundUser = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (foundUser) {
            console.log('4. Middleware DB Lookup: SUCCESS');
        } else {
            console.error('4. Middleware DB Lookup: FAILED (User not found)');
        }

    } catch (e) {
        console.error('Token Verification Failed:', e);
    }
}

testAuth()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

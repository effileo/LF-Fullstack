
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function listAdmins() {
    try {
        const admins = await prisma.user.findMany({
            where: {
                role: {
                    in: ['SUPER_ADMIN', 'HOTEL_ADMIN']
                }
            },
            select: {
                email: true,
                role: true,
                name: true
            }
        });
        console.log('--- ADMIN USERS ---');
        console.table(admins);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

listAdmins();

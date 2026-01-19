
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkLinks() {
    try {
        const admins = await prisma.user.findMany({
            where: { role: 'HOTEL_ADMIN' },
            include: { hotel: true }
        });

        console.log('--- HOTEL ADMIN LINKS ---');
        admins.forEach(admin => {
            console.log(`Admin: ${admin.email}`);
            console.log(`Hotel: ${admin.hotel ? admin.hotel.name : 'NULL (No Hotel Linked!)'}`);
            console.log('-------------------------');
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkLinks();

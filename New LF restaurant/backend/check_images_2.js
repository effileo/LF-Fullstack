
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const hotels = await prisma.hotel.findMany({
        select: {
            name: true,
            image: true
        }
    });

    hotels.forEach(h => {
        console.log(`Name: ${h.name}`);
        console.log(`Image: '${h.image}'`);
        console.log('---');
    });
}

main()
    .catch(e => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

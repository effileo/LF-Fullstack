
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hotels = await prisma.hotel.findMany({
    take: 5,
    select: {
      id: true,
      name: true,
      image: true
    }
  });

  console.log('Hotels:', JSON.stringify(hotels, null, 2));
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

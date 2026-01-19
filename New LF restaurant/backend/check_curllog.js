
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkUser() {
    const email = 'curllog@example.com';
    const user = await prisma.user.findUnique({
        where: { email },
    });
    console.log('Curl Log User:', user);
}

checkUser()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

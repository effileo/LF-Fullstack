
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("--- Testing Database Connection ---");
    try {
        await prisma.$connect();
        console.log("✅ Successfully connected to the database!");
        const userCount = await prisma.user.count();
        console.log(`✅ Database is responsive. User count: ${userCount}`);
    } catch (e) {
        console.error("❌ Connection failed:", e.message);
        console.error("Details:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

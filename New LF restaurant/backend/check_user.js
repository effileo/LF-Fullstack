
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUser() {
    console.log("🔍 Searching for user 'Fita Alemayehu'...");

    try {
        const user = await prisma.user.findFirst({
            where: {
                name: 'Fita Alemayehu'
            }
        });

        if (user) {
            console.log("\n✅ User Found!");
            console.log("------------------------------------------------");
            console.log(`ID:       ${user.id}`);
            console.log(`Name:     ${user.name}`);
            console.log(`Email:    ${user.email}`);
            console.log(`Role:     ${user.role}`);
            console.log(`Created:  ${user.createdAt}`); // Assuming createdAt exists, otherwise might be undefined in log
            console.log("------------------------------------------------");
        } else {
            console.log("\n❌ User 'Fita Alemayehu' NOT found in the database.");
            console.log("Tip: Check for typos or ensure the signup process completed successfully.");
        }
    } catch (error) {
        console.error("❌ Error querying database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUser();

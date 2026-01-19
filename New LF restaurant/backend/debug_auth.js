
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("--- DEBUGGING AUTH ---");
    const email = 'admin.sheraton@lf.com';

    // 1. Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        console.log(`✅ User found: ${user.email}`);
        console.log(`   User ID: ${user.id}`);

        // 1.b Try to update the new field to ensure Prisma Client knows about it
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { resetPasswordToken: "test-token" }
            });
            console.log("✅ Successfully updated resetPasswordToken. Client is in sync.");
        } catch (updateError) {
            console.error("❌ Failed to update resetPasswordToken. Client might be out of sync:", updateError.message);
        }

    } else {
        console.log(`❌ User NOT found: ${email}`);
    }

    // 3. Simulate Controller Logic
    console.log("--- Simulating Controller Logic ---");
    try {
        const crypto = await import('crypto');

        // Mock finding user
        const foundUser = await prisma.user.findUnique({ where: { email } });
        console.log("Found User ID:", foundUser.id);

        // Mock Token generation
        const resetTokenMock = crypto.randomBytes(32).toString('hex');
        const resetPasswordTokenMock = crypto.createHash('sha256').update(resetTokenMock).digest('hex');
        const resetPasswordExpiresMock = new Date(Date.now() + 10 * 60 * 1000);

        console.log("Token generated:", resetTokenMock);
        console.log("Hash generated:", resetPasswordTokenMock);

        // Mock Update
        await prisma.user.update({
            where: { id: foundUser.id },
            data: {
                resetPasswordToken: resetPasswordTokenMock,
                resetPasswordExpires: resetPasswordExpiresMock
            }
        });
        console.log("✅ Simulate Controller Update: SUCCESS");

    } catch (e) {
        console.error("❌ Simulate Controller ERROR:", e);
    }

    // 2. Check if schema has new columns (by trying to update with a dummy call or introspection)
    // We'll just try to read a user and see if we can select the field, or try a raw query
    try {
        const result = await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'resetPasswordToken';`;
        console.log("Schema Columns Check:", result);

        if (result.length > 0) {
            console.log("✅ Column 'resetPasswordToken' EXISTS in database.");
        } else {
            console.log("❌ Column 'resetPasswordToken' MISSING in database.");
        }
    } catch (e) {
        console.error("Error checking schema:", e.message);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

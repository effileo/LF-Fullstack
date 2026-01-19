
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("--- CHECKING PRODUCT IMAGES ---");

    // Names from the screenshot
    const productNames = [
        "Swedish Massage",
        "Deep Tissue",
        "Aromatherapy",
        "Hot Stone",
        "Reflexology",
        "Live Jazz Night"
    ];

    const products = await prisma.product.findMany({
        where: {
            name: { in: productNames }
        },
        select: {
            name: true,
            type: true,
            image: true,
            hotel: {
                select: { name: true }
            }
        }
    });

    console.log(JSON.stringify(products, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

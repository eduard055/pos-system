import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});


async function main() {

  const category = await prisma.category.create({
    data: {
      name: "Food",
    },
  });


  await prisma.product.createMany({
    data: [
      {
        name: "Mango Shake",
        sku: "SHA001",
        price: 79,
        stockQuantity: 20,
        image: "🥭",
        categoryId: category.id,
      },
      {
        name: "Chicken Wings",
        sku: "CHK001",
        price: 100,
        stockQuantity: 15,
        image: "🍗",
        categoryId: category.id,
      },
    ],
  });


  console.log("Database seeded!");
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
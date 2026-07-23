import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

import { seedLemonade } from "./seed-lemonade.js";
import { seedChicken } from "./seed-chicken.js";
import { seedPoppers } from "./seed-poppers.js";
import { seedBurger } from "./seed-burger.js";
import { seedFries } from "./seed-fries.js";
import { seedAddons } from "./seed-addons.js";
import { seedCombos } from "./seed-combo.js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🧹 Cleaning database...");

  await prisma.modifierOption.deleteMany();
  await prisma.modifierGroup.deleteMany();
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("🌱 Seeding database...");

  await seedLemonade(prisma);
  await seedChicken(prisma);
  await seedPoppers(prisma);
  await seedBurger(prisma);
  await seedFries(prisma);
  await seedAddons(prisma);
  await seedCombos(prisma);

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
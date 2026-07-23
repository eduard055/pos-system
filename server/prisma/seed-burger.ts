import { PrismaClient } from "../src/generated/prisma/client.js";

export async function seedBurger(prisma: PrismaClient) {

  console.log("🍔 Seeding Burgers...");

  const category = await prisma.category.create({

    data: {

      name: "Burger"

    }

  });

  const burgers = [

    {
      sku: "BRG001",
      name: "Classic Burger",
      price: 79
    },

    {
      sku: "BRG002",
      name: "Cheese Burger",
      price: 99
    },

    {
      sku: "BRG003",
      name: "Ultimate Burger",
      price: 149
    }

  ];

  for (const burger of burgers) {

    await prisma.product.create({

      data: {

        name: burger.name,

        sku: burger.sku,

        price: burger.price,

        stockQuantity: 999,

        image: "🍔",

        categoryId: category.id

      }

    });

  }

  console.log("✅ Burgers Seeded");

}
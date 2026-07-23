import { PrismaClient } from "../src/generated/prisma/client.js";

export async function seedCombos(prisma: PrismaClient) {

  console.log("🍱 Seeding Combos...");

  const category = await prisma.category.create({

    data:{

      name:"Combo"

    }

  });

  const combos = [

    {
      sku:"C1",
      name:"Chicken Wings + Lemonade Classic",
      price:239
    },

    {
      sku:"C2",
      name:"Chicken Wings + Small Fries + Lemonade Classic",
      price:289
    },

    {
      sku:"C3",
      name:"Chicken Wings + Classic Burger + Small Fries + Lemonade Classic",
      price:369
    },

    {
      sku:"B1",
      name:"Classic Burger + Lemonade Classic",
      price:109
    },

    {
      sku:"B2",
      name:"Classic Burger + Regular Fries + Lemonade Classic",
      price:159
    },

    {
      sku:"P1",
      name:"Poppers + Lemonade Classic",
      price:159
    },

    {
      sku:"P2",
      name:"Poppers + Regular Fries + Lemonade Classic",
      price:199
    },

    {
      sku:"P3",
      name:"Poppers + Classic Burger + Regular Fries + Lemonade Classic",
      price:279
    }

  ];

  for(const combo of combos){

    await prisma.product.create({

      data:{

        name:combo.name,

        sku:combo.sku,

        price:combo.price,

        stockQuantity:999,

        image:"🍱",

        categoryId:category.id

      }

    });

  }

  console.log("✅ Combos Seeded");

}
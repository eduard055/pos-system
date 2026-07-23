import { PrismaClient } from "../src/generated/prisma/client.js";

export async function seedAddons(prisma: PrismaClient) {

  console.log("➕ Seeding Add-ons...");

  const category = await prisma.category.create({

    data: {

      name: "Add-ons"

    }

  });

  const addons = [

    {
      sku: "ADD001",
      name: "Extra Sauce",
      price: 20,
      image: "🥣"
    },

    {
      sku: "ADD002",
      name: "Plain Rice",
      price: 15,
      image: "🍚"
    },

    {
      sku: "ADD003",
      name: "Soda",
      price: 20,
      image: "🥤"
    },

    {
      sku: "ADD004",
      name: "Popping Boba",
      price: 20,
      image: "🧋"
    },

    {
      sku: "ADD005",
      name: "Nata",
      price: 15,
      image: "🧊"
    }

  ];

  for (const addon of addons) {

    await prisma.product.create({

      data: {

        name: addon.name,

        sku: addon.sku,

        price: addon.price,

        stockQuantity: 999,

        image: addon.image,

        categoryId: category.id

      }

    });

  }

  console.log("✅ Add-ons Seeded");

}
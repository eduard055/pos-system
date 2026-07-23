import { PrismaClient } from "../src/generated/prisma/client.js";

export async function seedPoppers(prisma: PrismaClient) {

  console.log("🍿 Seeding Poppers...");

  const category = await prisma.category.create({
    data: {
      name: "Poppers"
    }
  });

  const flavors = [
    "Cheezzy",
    "Teriyaki",
    "Gravy",
    "BBQ",
    "Salted Egg",
    "Garlic Parmesan",
    "Buffalo"
  ];

  const products = [

    {
      sku: "PPRA001",
      name: "Poppers - Ala Cart",
      price: 199
    },

    {
      sku: "PPR001",
      name: "Poppers with Rice",
      price: 129
    }

  ];

  for (const product of products) {

    const created = await prisma.product.create({

      data: {

        name: product.name,

        sku: product.sku,

        price: product.price,

        stockQuantity: 999,

        image: "🍿",

        categoryId: category.id

      }

    });

    // Flavor
    const flavorGroup = await prisma.modifierGroup.create({

      data: {

        name: "Flavor",

        required: true,

        multiple: false,

        productId: created.id

      }

    });

    await prisma.modifierOption.createMany({

      data: flavors.map(flavor => ({

        name: flavor,

        price: 0,

        modifierGroupId: flavorGroup.id

      }))

    });

    // Add-ons
    const addonGroup = await prisma.modifierGroup.create({

      data: {

        name: "Add-ons",

        required: false,

        multiple: true,

        productId: created.id

      }

    });

    await prisma.modifierOption.createMany({

      data: [

        {
          name: "Egg",
          price: 15,
          modifierGroupId: addonGroup.id
        },

        {
          name: "Extra Sauce",
          price: 20,
          modifierGroupId: addonGroup.id
        },

        {
          name: "Plain Rice",
          price: 15,
          modifierGroupId: addonGroup.id
        },

        {
          name: "Chowfan Rice",
          price: 35,
          modifierGroupId: addonGroup.id
        }

      ]

    });

  }

  console.log("✅ Poppers Seeded");

}
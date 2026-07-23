import { PrismaClient } from "../src/generated/prisma/client.js";

export async function seedLemonade(prisma: PrismaClient) {

  console.log("🍋 Seeding Lemonade...");

  const category = await prisma.category.create({
    data: {
      name: "Lemonade"
    }
  });

  const lemonade = await prisma.product.create({
    data: {
      name: "Lemonade",
      sku: "LMD000",
      price: 29,
      stockQuantity: 999,
      image: "🍋",
      categoryId: category.id
    }
  });

  // ==========================
  // FLAVOR
  // ==========================

  const flavorGroup =
    await prisma.modifierGroup.create({

      data: {

        name: "Flavor",

        required: true,

        multiple: false,

        productId: lemonade.id

      }

    });

  await prisma.modifierOption.createMany({

    data: [

      {
        name: "Classic",
        price: 0,
        modifierGroupId: flavorGroup.id
      },

      {
        name: "Pipino",
        price: 6,
        modifierGroupId: flavorGroup.id
      },

      {
        name: "Yakult",
        price: 6,
        modifierGroupId: flavorGroup.id
      },

      {
        name: "Chia",
        price: 6,
        modifierGroupId: flavorGroup.id
      },

      {
        name: "Strawberry",
        price: 6,
        modifierGroupId: flavorGroup.id
      },

      {
        name: "Blueberry",
        price: 6,
        modifierGroupId: flavorGroup.id
      },

      {
        name: "Lychee",
        price: 6,
        modifierGroupId: flavorGroup.id
      },

      {
        name: "Orange",
        price: 6,
        modifierGroupId: flavorGroup.id
      }

    ]

  });

  // ==========================
  // ADD ONS
  // ==========================

  const addonGroup =
    await prisma.modifierGroup.create({

      data: {

        name: "Add-ons",

        required: false,

        multiple: true,

        productId: lemonade.id

      }

    });

  await prisma.modifierOption.createMany({

    data: [

      {
        name: "Soda",
        price: 20,
        modifierGroupId: addonGroup.id
      },

      {
        name: "Popping Boba",
        price: 20,
        modifierGroupId: addonGroup.id
      },

      {
        name: "Nata",
        price: 15,
        modifierGroupId: addonGroup.id
      }

    ]

  });

  console.log("✅ Lemonade Seeded");
}
import { PrismaClient } from "../src/generated/prisma/client.js";

export async function seedFries(prisma: PrismaClient) {

  console.log("🍟 Seeding Fries...");

  const category = await prisma.category.create({

    data: {

      name: "Fries"

    }

  });

  const fries = [

    {
      sku: "FRY001",
      name: "Regular Fries",
      price: 49
    },

    {
      sku: "FRY002",
      name: "Large Fries",
      price: 79
    }

  ];

  const flavors = [

    "Cheese",

    "BBQ",

    "Sour Cream"

  ];

  for (const fry of fries) {

    const created = await prisma.product.create({

      data: {

        name: fry.name,

        sku: fry.sku,

        price: fry.price,

        stockQuantity: 999,

        image: "🍟",

        categoryId: category.id

      }

    });

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

  }

  console.log("✅ Fries Seeded");

}
import { PrismaClient } from "../src/generated/prisma/client.js";

export async function seedChicken(prisma: PrismaClient) {

  console.log("🍗 Seeding Chicken Wings...");

  const category = await prisma.category.create({
    data: {
      name: "Chicken Wings"
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
      sku: "CHKA001",
      name: "6pcs Chicken Wings",
      price: 215
    },
    {
      sku: "CHKA002",
      name: "12pcs Chicken Wings",
      price: 350
    },
    {
      sku: "CHKA003",
      name: "24pcs Chicken Wings",
      price: 680
    }
  ];

  for (const product of products) {

    const created = await prisma.product.create({

      data: {

        name: product.name,

        sku: product.sku,

        price: product.price,

        stockQuantity: 999,

        image: "🍗",

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

  console.log("✅ Chicken Wings Seeded");

}
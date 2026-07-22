import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

console.log("PRISMA =", prisma);

let products = [
  {
    id: 1,
    code: "SHA001",
    name: "Mango Shake",
    category: "Shake",
    price: 79,
    stock: 20,
    image: "🥭",
  },
  {
    id: 2,
    code: "CHK001",
    name: "Chicken Wings",
    category: "Chicken Wings",
    price: 100,
    stock: 15,
    image: "🍗",
  },
];


export async function listProducts(
  _req: Request,
  res: Response
) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.json(products);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database error",
    });
  }
}

export function getProduct(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const product = products.find(
    (p) => p.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
}

export function createProduct(
  req: Request,
  res: Response
) {
  const product = {
    id: Date.now(),
    ...req.body,
  };

  products.push(product);

  res.status(201).json(product);
}

export function updateProduct(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const index = products.findIndex(
    (p) => p.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products[index] = {
    ...products[index],
    ...req.body,
  };

  res.json(products[index]);
}

export function adjustStock(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const product = products.find(
    (p) => p.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.stock += Number(req.body.quantity);

  res.json(product);
}

export function deleteProduct(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  products = products.filter(
    (p) => p.id !== id
  );

  res.sendStatus(204);
}
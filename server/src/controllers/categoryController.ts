 import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function listCategories(
  _req: Request,
  res: Response
) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return res.json(categories);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: "Failed to load categories",
    });

  }
}
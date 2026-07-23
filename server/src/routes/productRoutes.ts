import { Router } from "express";

import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  adjustStock,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

// GET all products
router.get("/", listProducts);

// GET single product
router.get("/:id", getProduct);

// CREATE product
router.post("/", createProduct);

// UPDATE product
router.put("/:id", updateProduct);

// ADJUST STOCK
router.patch("/:id/stock", adjustStock);

// DELETE product
router.delete("/:id", deleteProduct);

export default router;
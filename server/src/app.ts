import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "POS Backend Running 🚀",
  });
});

// Product API
app.use("/api/products", productRoutes);

export default app;
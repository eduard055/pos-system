import express from "express";
import cors from "cors";

import saleRoutes from "./routes/saleRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import modifierRoutes from "./routes/modifierRoutes.js";


const app = express();


app.use(cors());

app.use(express.json());


app.get("/", (_req, res) => {
  res.json({
    message: "POS Backend Running 🚀",
  });
});


// APIs
app.use("/api/products", productRoutes);

app.use("/api/sales", saleRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/modifiers", modifierRoutes);



export default app;
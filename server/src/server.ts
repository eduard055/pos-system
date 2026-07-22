import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { prisma } from "./lib/prisma";

prisma.$connect()
  .then(() => {
    console.log("✅ PostgreSQL Connected");
  })
  .catch((err: unknown) => {
    console.error("❌ Database Connection Failed");
    console.error(err);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
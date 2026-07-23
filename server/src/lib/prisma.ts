import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("PASSWORD:", process.env.DATABASE_URL?.split(":")[2]?.split("@")[0]);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});
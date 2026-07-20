import type { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Coca-Cola",
    price: 45,
    stock: 120,
    image: "🥤",
    category: "Drinks",
  },
  {
    id: 2,
    name: "Sprite",
    price: 45,
    stock: 95,
    image: "🥤",
    category: "Drinks",
  },
  {
    id: 3,
    name: "Bread",
    price: 38,
    stock: 40,
    image: "🍞",
    category: "Bakery",
  },
  {
    id: 4,
    name: "Chocolate",
    price: 25,
    stock: 75,
    image: "🍫",
    category: "Snacks",
  },
  {
    id: 5,
    name: "Milk",
    price: 68,
    stock: 50,
    image: "🥛",
    category: "Dairy",
  },
  {
    id: 6,
    name: "Coffee",
    price: 120,
    stock: 20,
    image: "☕",
    category: "Beverages",
  },
];
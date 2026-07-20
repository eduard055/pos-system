import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductStore {
  products: Product[];

  addProduct: (product: Product) => void;

  deleteProduct: (id: number) => void;

  updateProduct: (
    id: number,
    product: Partial<Product>
  ) => void;

  decreaseStock: (
    id: number,
    quantity: number
  ) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [
        {
          id: 1,
          name: "Coffee",
          category: "Drinks",
          price: 120,
          stock: 50,
          image: "☕",
        },

        {
          id: 2,
          name: "Bread",
          category: "Bakery",
          price: 80,
          stock: 30,
          image: "🍞",
        },
      ],

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter(
            (p) => p.id !== id
          ),
        })),

      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...product,
                }
              : p
          ),
        })),

      decreaseStock: (id, quantity) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? {
                  ...p,
                  stock: Math.max(0, p.stock - quantity),
                }
              : p
          ),
        })),
    }),

    {
      name: "product-storage",
    }
  )
);
import { create } from "zustand";

const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:4000/api";

export interface Category {
  id: string;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();

      set({
        categories: data,
      });
    } catch (err) {
      console.error(err);
    }
  },
}));
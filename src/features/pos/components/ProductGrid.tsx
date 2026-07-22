import { useEffect, useState } from "react";
import { useProductStore } from "../../../store/productStore";
import ProductCard from "./ProductCard";
import type { Product } from "../types";

interface Props {
  onAdd: (product: Product) => void;
}

export default function ProductGrid({
  onAdd
}: Props) {

  const products = useProductStore(
    state => state.products
  );
  const fetchProducts = useProductStore(state => state.fetchProducts);

  useEffect(() => { void fetchProducts(); }, [fetchProducts]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    "Shake",
    "Chicken Wings",
    "Poppers",
    "Burger",
    "Fries",
    "Lemonade",
    "Add-ons",
    "Combo"
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          product =>
            product.category === selectedCategory
        );

  return (

    <div>

      {/* CATEGORY BUTTONS */}

      <div
        className="
        flex
        gap-3
        flex-wrap
        mb-6
        "
      >

        {
          categories.map(category => (

            <button

              key={category}

              onClick={() =>
                setSelectedCategory(category)
              }

              className={`
              px-4
              py-2
              rounded-xl
              font-semibold
              transition

              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-slate-100"
              }

              `}

            >

              {category}

            </button>

          ))
        }

      </div>

      {/* PRODUCTS */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        "
      >

        {
          filteredProducts.map(product => (

            <ProductCard

              key={product.id}

              product={product}

              onAdd={onAdd}

            />

          ))
        }

      </div>

    </div>

  );

}

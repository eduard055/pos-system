import ProductCard from "./ProductCard";
import { products } from "../data/products";
import type { Product } from "../types";
import { useProductStore } from "../../../store/productStore";


interface Props {
  onAdd: (product: Product) => void;
}


export default function ProductGrid({onAdd}: Props) {


const products = useProductStore(
  state => state.products
);
  console.log("PRODUCT GRID onAdd:", onAdd);


  return (
    <div
      className="
      grid
      grid-cols-2
      lg:grid-cols-3
      gap-5
      "
    >

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
        />

      ))}

    </div>
  );
}
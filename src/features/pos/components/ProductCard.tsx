import { useState } from "react";
import type { Product } from "../types";
import FlavorModal from "./FlavorModal";
import ShakeSizeModal from "./ShakeSizeModal";
import FriesFlavorModal from "./FriesFlavorModal";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAdd,
}: Props) {

  const [showFlavor, setShowFlavor] = useState(false);

  const [showSize, setShowSize] = useState(false);

  const [showFriesFlavor, setShowFriesFlavor] = useState(false);

  function handleAdd(){

    // SHAKES
    if(product.hasSize){
        
      setShowSize(true);

      return;

    }

    // CHICKEN / POPPERS
    if(

      product.category === "Chicken Wings" ||

      product.category === "Chicken Ala Carte" ||

      product.name.toLowerCase().includes("poppers")

    ){

      setShowFlavor(true);

      return;

    }

    onAdd(product);

  }

  function addFlavor(flavor:string){

    const flavoredProduct: Product = {

      ...product,

      id: Date.now(),

      name:`${product.name} - ${flavor}`

    };

    onAdd(flavoredProduct);

    setShowFlavor(false);

  }

  function addSize(size:string, price:number){

    const sizedProduct: Product = {

      ...product,

      id: Date.now(),

      name:`${product.name} (${size})`,

      price

    };

    onAdd(sizedProduct);

    setShowSize(false);

  }

  return(

    <>

      <div
      className="
      bg-white
      rounded-2xl
      border
      p-5
      ">

        <div className="text-5xl text-center">

          {product.image}

        </div>

        <h3 className="mt-4 font-bold">

          {product.name}

        </h3>

        <p className="text-slate-500">

          {product.category}

        </p>

        <p className="font-bold mt-2">

          ₱{product.price}

        </p>

        <button

        onClick={handleAdd}

        className="
        mt-3
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        w-full
        "

        >

          Add

        </button>

      </div>

      {showFlavor && (

        <FlavorModal

        product={product}

        onSelect={addFlavor}

        onClose={()=>setShowFlavor(false)}

        />

      )}

      {showSize && (

        <ShakeSizeModal

          product={product}

          onSelect={addSize}

          onClose={()=>setShowSize(false)}

        />

      )}

    </>

  );

}
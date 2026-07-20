import type { Product } from "../types";


interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}


export default function ProductCard({
  product,
  onAdd,
}: Props) {


  return (
        <div
        className={`
        bg-white
        rounded-2xl
        border
        p-5
        ${product.stock <= 0 ? "opacity-50" : ""}
        `}
        >

      <div className="text-5xl text-center">
        {product.image}
      </div>


      <h3 className="mt-4 font-bold">
        {product.name}
      </h3>


      <p>
        {product.category}
      </p>


      {
  product.stock <= 0 ? (

    <div
      className="
        mt-3
        text-center
        font-bold
        text-red-500
      "
    >
      OUT OF STOCK
    </div>

  ) : (

    <button
      onClick={() => {
        console.log("BUTTON CLICKED", product);
        onAdd(product);
      }}
      className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
      "
    >
      Add
    </button>

  )
}

    </div>
  );

}
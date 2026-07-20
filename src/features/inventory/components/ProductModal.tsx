import { useProductStore } from "../../../store/productStore";
import { useEffect, useState } from "react";
import type { Product } from "../../pos/types";


interface Props {
  onClose: () => void;
  product?: Product;
}


export default function ProductModal({
  onClose,
  product
}: Props) {


  const addProduct = useProductStore(
    state => state.addProduct
  );


  const updateProduct = useProductStore(
    state => state.updateProduct
  );



  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");



  useEffect(() => {


    setName(product?.name || "");

    setCategory(product?.category || "");

    setPrice(
      product ? String(product.price) : ""
    );

    setStock(
      product ? String(product.stock) : ""
    );

    setImage(product?.image || "");


  }, [product]);





  function handleSave() {

      if (!name || !category || !price || !stock || !image) {
  alert("Please complete all fields.");
  return;
}
    const newProduct = {


      id: product?.id ?? Date.now(),


      name,


      category,


      price: Number(price),


      stock: Number(stock),


      image


    };




    if(product){


      updateProduct(

        product.id,

        newProduct

      );


    } else {


      addProduct(newProduct);


    }



    onClose();


  }







  return (


        <div
      onClick={onClose}
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >



          <div
      onClick={(e) => e.stopPropagation()}
      className="
      bg-white
      rounded-2xl
      p-6
      w-[400px]
      shadow-xl
      "
    >



        <h2
          className="
          text-2xl
          font-bold
          mb-5
          "
        >

          {product ? "Edit Product" : "Add Product"}

        </h2>





        <input

          placeholder="Product name"

          value={name}

          className="
          border
          p-3
          w-full
          mb-3
          rounded-lg
          "

          onChange={(e)=>
            setName(e.target.value)
          }

        />





        <input

          placeholder="Category"

          value={category}

          className="
          border
          p-3
          w-full
          mb-3
          rounded-lg
          "

          onChange={(e)=>
            setCategory(e.target.value)
          }

        />





        <input

          placeholder="Price"

          type="number"

          value={price}

          className="
          border
          p-3
          w-full
          mb-3
          rounded-lg
          "

          onChange={(e)=>
            setPrice(e.target.value)
          }

        />





        <input

          placeholder="Stock"

          type="number"

          value={stock}

          className="
          border
          p-3
          w-full
          mb-3
          rounded-lg
          "

          onChange={(e)=>
            setStock(e.target.value)
          }

        />





        <input

          placeholder="Emoji image (🍔)"

          value={image}

          className="
          border
          p-3
          w-full
          mb-5
          rounded-lg
          "

          onChange={(e)=>
            setImage(e.target.value)
          }

        />






        <div className="flex gap-3">





          <button

            onClick={onClose}

            className="
            flex-1
            border
            py-3
            rounded-lg
            "

          >

            Cancel

          </button>






          <button

            onClick={handleSave}

            className="
            flex-1
            bg-blue-600
            text-white
            py-3
            rounded-lg
            "

          >

            {product ? "Update" : "Save"}

          </button>




        </div>




      </div>




    </div>


  );

}
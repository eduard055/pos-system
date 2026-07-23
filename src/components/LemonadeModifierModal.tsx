import { useState } from "react";
import type {
  Product,
  ModifierGroup,
  ModifierOption
} from "../features/pos/types";


interface Props {

  product: Product;

  onClose: () => void;

  onConfirm: (item: Product) => void;

}


export default function LemonadeModifierModal({
  product,
  onClose,
  onConfirm
}: Props) {


  const flavorGroup =
    product.modifierGroups?.find(
      (g: ModifierGroup) =>
        g.name === "Flavor"
    );


  const addonGroup =
    product.modifierGroups?.find(
      (g: ModifierGroup) =>
        g.name === "Add-ons"
    );



  const [selectedFlavor, setSelectedFlavor] =
    useState<ModifierOption | null>(null);


  const [addons, setAddons] =
    useState<ModifierOption[]>([]);



  function toggleAddon(option: ModifierOption) {


    const exists =
      addons.some(
        a => a.id === option.id
      );


    if (exists) {

      setAddons(
        addons.filter(
          a => a.id !== option.id
        )
      );

    } else {

      setAddons([
        ...addons,
        option
      ]);

    }

  }



  function confirm() {


    if (!selectedFlavor) {

      alert("Please select lemonade flavor");

      return;

    }



    const finalProduct: Product = {

      ...product,

      id: Date.now(),

      name:
      `${product.name} - ${selectedFlavor.name}`,

      price:
        product.price
        +
        selectedFlavor.price
        +
        addons.reduce(
          (sum, addon) =>
            sum + addon.price,
          0
        )

    };



    onConfirm(finalProduct);


    onClose();

  }





  return (

    <div
      className="
      fixed inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >


      <div
        className="
        bg-white
        rounded-2xl
        p-6
        w-[450px]
        "
      >


        <h2
        className="
        text-2xl
        font-bold
        mb-5
        "
        >
          🍋 Customize Lemonade
        </h2>



        <h3 className="font-bold mb-2">
          Flavor
        </h3>



        <div
        className="
        grid
        grid-cols-2
        gap-3
        "
        >

        {
          flavorGroup?.options.map(
            (option: ModifierOption) => (

              <button

              key={option.id}

              onClick={() =>
                setSelectedFlavor(option)
              }

              className={`

              border
              p-3
              rounded-xl

              ${
                selectedFlavor?.id === option.id
                ?
                "bg-blue-600 text-white"
                :
                ""
              }

              `}

              >

                {option.name}

                {
                  option.price > 0 &&
                  <>
                    <br/>
                    +₱{option.price}
                  </>
                }


              </button>

            )
          )
        }


        </div>




        <h3
        className="
        font-bold
        mt-5
        mb-2
        "
        >
          Add-ons
        </h3>




        <div
        className="
        grid
        grid-cols-2
        gap-3
        "
        >

        {
          addonGroup?.options.map(
            (option: ModifierOption) => (

              <button

              key={option.id}

              onClick={() =>
                toggleAddon(option)
              }


              className={`

              border
              p-3
              rounded-xl


              ${
                addons.some(
                  a => a.id === option.id
                )
                ?
                "bg-green-500 text-white"
                :
                ""
              }


              `}

              >

                {option.name}

                <br/>

                +₱{option.price}


              </button>


            )
          )
        }


        </div>





        <div
        className="
        flex
        gap-3
        mt-6
        "
        >


          <button

          onClick={onClose}

          className="
          flex-1
          border
          p-3
          rounded-xl
          "

          >
            Cancel
          </button>





          <button

          onClick={confirm}

          className="
          flex-1
          bg-blue-600
          text-white
          p-3
          rounded-xl
          "

          >
            Add
          </button>



        </div>



      </div>


    </div>

  );

}   
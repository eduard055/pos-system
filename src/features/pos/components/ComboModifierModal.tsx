import { useState } from "react";
import type { Product } from "../types";

interface Props {
  product: Product;
  onConfirm: (product: Product) => void;
  onClose: () => void;
}

const chickenFlavors = [
  "Cheezzy",
  "Teriyaki",
  "Gravy",
  "BBQ",
  "Salted Egg",
  "Garlic Parmesan",
  "Buffalo"
];

const friesFlavors = [
  "Cheese",
  "BBQ",
  "Sour Cream"
];

const lemonadeFlavors = [
  "Classic",
  "Pipino",
  "Yakult",
  "Chia",
  "Strawberry",
  "Blueberry",
  "Lychee",
  "Orange"
];

export default function ComboModifierModal({

  product,

  onConfirm,

  onClose

}: Props) {

  const [chicken,setChicken] =
    useState(chickenFlavors[0]);

  const [fries,setFries] =
    useState(friesFlavors[0]);

  const [lemonade,setLemonade] =
    useState(lemonadeFlavors[0]);

  function addCombo(){

    onConfirm({

      ...product,

      id: Date.now(),

      name:
`${product.name}
• ${chicken}
• ${fries} Fries
• ${lemonade} Lemonade`

    });

    onClose();

  }

  return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-xl p-6 w-[420px]">

<h2 className="text-xl font-bold mb-5">

Customize Combo

</h2>


<label className="font-semibold">

Chicken Flavor

</label>

<select

className="border w-full p-2 rounded mb-4"

value={chicken}

onChange={e=>setChicken(e.target.value)}

>

{

chickenFlavors.map(flavor=>(

<option
key={flavor}
value={flavor}
>

{flavor}

</option>

))

}

</select>



<label className="font-semibold">

Fries Flavor

</label>

<select

className="border w-full p-2 rounded mb-4"

value={fries}

onChange={e=>setFries(e.target.value)}

>

{

friesFlavors.map(flavor=>(

<option
key={flavor}
value={flavor}
>

{flavor}

</option>

))

}

</select>



<label className="font-semibold">

Lemonade Flavor

</label>

<select

className="border w-full p-2 rounded mb-6"

value={lemonade}

onChange={e=>setLemonade(e.target.value)}

>

{

lemonadeFlavors.map(flavor=>(

<option
key={flavor}
value={flavor}
>

{flavor}

</option>

))

}

</select>



<div className="flex gap-3">

<button

onClick={onClose}

className="flex-1 border rounded-lg py-2"

>

Cancel

</button>

<button

onClick={addCombo}

className="flex-1 bg-blue-600 text-white rounded-lg py-2"

>

Add

</button>

</div>

</div>

</div>

  );

}
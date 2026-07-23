import { useState } from "react";
import type { Product } from "../types";
import LemonadeModifierModal from "../../../components/LemonadeModifierModal";
import FlavorModal from "./FlavorModal";
import ShakeSizeModal from "./ShakeSizeModal";
import ComboModifierModal from "./ComboModifierModal";


interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}


export default function ProductCard({
  product,
  onAdd,
}: Props) {


 const [showLemonade, setShowLemonade] = useState(false);
const [showFlavor, setShowFlavor] = useState(false);
const [showSize, setShowSize] = useState(false);
const [showCombo, setShowCombo] = useState(false);
  



  function handleAdd(){

  // 🍔 COMBO MODIFIER
  if(product.category === "Combo"){

    setShowCombo(true);

    return;

  }

  // 🍋 NEW MODIFIER ENGINE
  if(
    product.modifierGroups &&
    product.modifierGroups.length > 0
  ){

    setShowLemonade(true);

    return;

  }

  // OLD SHAKE SYSTEM
  if(product.hasSize){

    setShowSize(true);

    return;

  }

  // OLD FLAVOR SYSTEM
  if(product.hasFlavor){

    setShowFlavor(true);

    return;

  }

  onAdd(product);

}



  function addFlavor(flavor:string){


    onAdd({

      ...product,

      id:Date.now(),

      name:
      `${product.name} - ${flavor}`

    });


    setShowFlavor(false);

  }




  function addSize(
    size:string,
    price:number
  ){


    onAdd({

      ...product,

      id:Date.now(),

      name:
      `${product.name} (${size})`,

      price

    });


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
"
>

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



{
showLemonade &&

<LemonadeModifierModal

product={product}

onConfirm={onAdd}

onClose={()=>
setShowLemonade(false)
}

/>

}




{
showFlavor &&

<FlavorModal

product={product}

onSelect={addFlavor}

onClose={()=>
setShowFlavor(false)
}

/>

}




{
showSize &&

<ShakeSizeModal

product={product}

onSelect={addSize}

onClose={()=>
setShowSize(false)
}

/>

}

{
showCombo &&

<ComboModifierModal

product={product}

onConfirm={onAdd}

onClose={()=>
setShowCombo(false)
}

/>

}


</>


);


}
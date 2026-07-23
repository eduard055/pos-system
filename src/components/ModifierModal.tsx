import { useState } from "react";
import type {
  Product,
  ModifierOption,
  ModifierGroup
} from "../features/pos/types";


interface Props {

  product: Product;

  onClose: () => void;

  onAdd: (item: Product) => void;

}



export default function ModifierModal({
  product,
  onClose,
  onAdd
}: Props) {


  const [selectedFlavor,setSelectedFlavor] =
    useState<ModifierOption | null>(null);


  const [addons,setAddons] =
    useState<ModifierOption[]>([]);



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





  function toggleAddon(
    option: ModifierOption
  ){


    const exists =
      addons.some(
        a=>a.id===option.id
      );



    if(exists){

      setAddons(
        addons.filter(
          a=>a.id!==option.id
        )
      );


    }else{


      setAddons([
        ...addons,
        option
      ]);


    }


  }






  function calculateTotal(){


    let total =
      product.price;



    if(selectedFlavor){

      total += selectedFlavor.price;

    }



    addons.forEach(
      addon=>{

        total += addon.price;

      }
    );



    return total;

  }







  function add(){


    if(!selectedFlavor){

      alert(
        "Please choose flavor"
      );

      return;

    }



    const item: Product = {

      ...product,

      id: Date.now(),

      price:
        calculateTotal(),

      name:
        `${product.name} - ${selectedFlavor.name}`

    };



    onAdd(item);

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
w-[420px]
shadow-xl
"
>



<h2
className="
text-2xl
font-bold
mb-4
"
>
🍋 Customize Lemonade
</h2>





<h3 className="font-bold mb-2">
Flavor
</h3>



<div className="space-y-2">


{
flavorGroup?.options.map(
(option: ModifierOption)=>(


<label

key={option.id}

className="
flex
justify-between
border
p-3
rounded-lg
cursor-pointer
"

>


<div>

<input

type="radio"

name="flavor"

checked={
selectedFlavor?.id===option.id
}

onChange={()=>
setSelectedFlavor(option)
}

/>


<span className="ml-2">

{option.name}

</span>


</div>



<span>

₱{product.price + option.price}

</span>


</label>


))

}


</div>







<h3 className="
font-bold
mt-5
mb-2
">

Add-ons

</h3>





<div className="space-y-2">


{
addonGroup?.options.map(
(option: ModifierOption)=>(


<label

key={option.id}

className="
flex
justify-between
border
p-3
rounded-lg
cursor-pointer
"

>


<div>


<input

type="checkbox"

checked={
addons.some(
a=>a.id===option.id
)
}

onChange={()=>
toggleAddon(option)
}

/>


<span className="ml-2">

{option.name}

</span>


</div>



<span>

+₱{option.price}

</span>


</label>


))

}


</div>








<div
className="
mt-5
border-t
pt-4
flex
justify-between
font-bold
text-xl
"
>


<span>
Total
</span>


<span>

₱{calculateTotal()}

</span>


</div>







<div
className="
flex
gap-3
mt-5
"
>


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

onClick={add}

className="
flex-1
bg-blue-600
text-white
py-3
rounded-lg
"

>

Add to Cart

</button>


</div>




</div>


</div>

);

}
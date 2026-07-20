import type { Product } from "../types";


interface Props {

product: Product;

onSelect:(flavor:string)=>void;

onClose:()=>void;

}



export default function FlavorModal({

product,

onSelect,

onClose

}:Props){



let flavors = [

"Cheezzy",

"Teriyaki",

"Gravy",

"BBQ",

"Salted Egg",

"Garlic Parmesan",

"Buffalo"

];



return (

<div
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
className="
bg-white
rounded-xl
p-6
w-[350px]
"
>



<h2 className="text-xl font-bold mb-4">

Choose Flavor

</h2>



<p className="mb-4">

{product.name}

</p>



<div className="space-y-2">


{
flavors.map(flavor=>(


<button

key={flavor}

onClick={()=>onSelect(flavor)}

className="
w-full
bg-blue-600
text-white
py-2
rounded-lg
"

>

{flavor}

</button>


))

}



</div>




<button

onClick={onClose}

className="
mt-4
w-full
border
py-2
rounded-lg
"

>

Cancel

</button>



</div>



</div>

);


}
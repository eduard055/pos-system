import type { CartItem } from "../store/cartStore";


interface Props {

  cart: CartItem[];

  subtotal: number;

  tax: number;

  total: number;

  cash: number;

  change: number;

  onClose: () => void;

}



export default function ReceiptModal({

  cart,

  subtotal,

  tax,

  total,

  cash,

  change,

  onClose

}: Props) {


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
w-[300px]
rounded-xl
shadow-2xl
p-5
font-mono
text-sm
"
>


{/* HEADER */}

<h2
className="
text-center
text-xl
font-bold
mb-1
"
>
POS PRO
</h2>


<p className="text-center text-xs">
123 Main Street
</p>


<p className="text-center text-xs mb-4">
Manila, Philippines
</p>



<hr className="border-dashed"/>



<div className="mt-4 space-y-1 text-xs">


<div className="flex justify-between">

<span>
Date
</span>

<span>
{new Date().toLocaleDateString()}
</span>

</div>



<div className="flex justify-between">

<span>
Time
</span>

<span>
{new Date().toLocaleTimeString()}
</span>

</div>



<div className="flex justify-between">

<span>
Cashier
</span>

<span>
Admin
</span>

</div>



<div className="flex justify-between">

<span>
Receipt #
</span>

<span>
{Math.floor(Math.random()*90000)+10000}
</span>

</div>


</div>



<hr className="border-dashed my-4"/>



{/* ITEMS */}

<div className="space-y-2">


{
cart.map(item => (

<div
key={item.id}
>


<div className="font-bold">
{item.name}
</div>


<div className="flex justify-between">


<span>
{item.quantity} x ₱{item.price.toFixed(2)}
</span>


<span>
₱{(item.price * item.quantity).toFixed(2)}
</span>


</div>


</div>


))
}



</div>



<hr className="border-dashed my-4"/>



{/* TOTALS */}

<div className="space-y-2">


<div className="flex justify-between">

<span>
Subtotal
</span>

<span>
₱{subtotal.toFixed(2)}
</span>

</div>




<div className="flex justify-between">

<span>
VAT (12%)
</span>

<span>
₱{tax.toFixed(2)}
</span>

</div>





<div className="
flex
justify-between
font-bold
text-base
">


<span>
TOTAL
</span>


<span>
₱{total.toFixed(2)}
</span>


</div>


</div>



<hr className="border-dashed my-4"/>




<div className="space-y-2">


<div className="flex justify-between">

<span>
Cash
</span>


<span>
₱{cash.toFixed(2)}
</span>


</div>




<div className="flex justify-between">

<span>
Change
</span>


<span>
₱{change.toFixed(2)}
</span>


</div>


</div>




<hr className="border-dashed my-4"/>




<p className="
text-center
text-xs
"
>

THANK YOU!

<br/>

Please Come Again ❤️

</p>




<div
className="
flex
gap-3
mt-5
"
>


<button

className="
flex-1
bg-blue-600
text-white
py-2
rounded-lg
font-bold
"

>

Print

</button>




<button

onClick={onClose}

className="
flex-1
border
py-2
rounded-lg
"

>

Close

</button>



</div>



</div>


</div>


);


}
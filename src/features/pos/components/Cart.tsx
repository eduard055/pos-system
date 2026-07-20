import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "../store/cartStore";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import ReceiptModal from "./ReceiptModal";
import { useProductStore } from "../../../store/productStore";
import { useSalesStore } from "../../../store/salesStore";
import { useSettingsStore } from "../../../store/settingsStore";


interface Props {

  cart: CartItemType[];

  increaseQuantity: (id:number)=>void;

  decreaseQuantity: (id:number)=>void;

  removeItem: (id:number)=>void;

  clearCart: () => void;

}



export default function Cart({

  cart,

  increaseQuantity,

  decreaseQuantity,

  removeItem,

  clearCart

}: Props) {


const decreaseStock = useProductStore(
  state => state.decreaseStock
);



const addSale = useSalesStore(
  state => state.addSale
);



const sales = useSalesStore(
  state => state.sales
);



// GET VAT FROM SETTINGS

const vatRate = useSettingsStore(
  state => state.vatRate
);



const [showCheckout,setShowCheckout] = useState(false);

const [showReceipt,setShowReceipt] = useState(false);

const [cashPaid,setCashPaid] = useState(0);

const [change,setChange] = useState(0);

const [receiptNo,setReceiptNo] = useState("");





const subtotal = cart.reduce(

(sum,item)=>

sum + item.price * item.quantity,

0

);




// DYNAMIC VAT

const tax = subtotal * (vatRate / 100);



const total = subtotal + tax;





return (

<div className="
bg-white
rounded-2xl
border
p-5
">


<h2 className="text-xl font-bold mb-5">
Cart
</h2>




{
cart.length === 0 ? (

<p className="text-slate-500">
Cart is empty
</p>

) : (

cart.map(item=>(

<CartItem

key={item.id}

item={item}

increaseQuantity={increaseQuantity}

decreaseQuantity={decreaseQuantity}

removeItem={removeItem}

/>

))

)

}





<div className="
mt-5
border-t
pt-4
space-y-2
">



<div className="flex justify-between">

<span>
Subtotal
</span>

<span>
₱{subtotal.toFixed(2)}
</span>

</div>





{
vatRate > 0 && (

<div className="flex justify-between">

<span>
VAT ({vatRate}%)
</span>

<span>
₱{tax.toFixed(2)}
</span>

</div>

)

}





<div className="
flex
justify-between
text-xl
font-bold
pt-3
border-t
">


<span>
Total
</span>



<span>
₱{total.toFixed(2)}
</span>


</div>





<button

onClick={()=>setShowCheckout(true)}

className="
mt-5
w-full
bg-blue-600
text-white
py-3
rounded-xl
font-bold
"

>

Checkout

</button>




</div>







{
showCheckout && (

<CheckoutModal

total={total}

onClose={()=>setShowCheckout(false)}



onSuccess={(cash,change)=>{


const newReceiptNo = String(
sales.length + 1
).padStart(5,"0");



setReceiptNo(newReceiptNo);





addSale({

id:Date.now(),

receiptNo:newReceiptNo,

date:new Date().toLocaleDateString(),

time:new Date().toLocaleTimeString(),

items:cart,

subtotal,

tax,

total,

cash,

change

});







cart.forEach(item=>{


decreaseStock(

item.id,

item.quantity

);


});







setCashPaid(cash);

setChange(change);


setShowCheckout(false);

setShowReceipt(true);



}}


/>

)

}








{
showReceipt && (



<ReceiptModal

cart={cart}

receiptNo={receiptNo}

subtotal={subtotal}

tax={tax}

total={total}

cash={cashPaid}

change={change}

vatRate={vatRate}

onClose={()=>{

setShowReceipt(false);

clearCart();

}}

/>


)

}






</div>


);


}
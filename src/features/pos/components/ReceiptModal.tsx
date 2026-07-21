import type { CartItem } from "../store/cartStore";


interface Props {

  cart: CartItem[];

  receiptNo:string;

  subtotal:number;

  tax:number;

  total:number;

  cash:number;

  change:number;

  vatRate:number;

  onClose:()=>void;

}



export default function ReceiptModal({

cart,

receiptNo,

subtotal,

tax,

total,

cash,

change,

vatRate,

onClose


}:Props){



function printReceipt(){

  const receipt =
    document.querySelector(".receipt");


  if(!receipt) return;



  const printWindow =
    window.open(
      "",
      "",
      "width=700,height=900"
    );



  if(!printWindow) return;



  printWindow.document.write(`

<html>

<head>

<title>
POS PRO Receipt
</title>


<style>


*{

box-sizing:border-box;

}



body{

font-family:monospace;

margin:0;

padding:20px;

display:flex;

justify-content:center;

background:white;

}



.receipt{

width:380px;

font-size:14px;

color:black;

}



.flex{

display:flex;

justify-content:space-between;

}



hr{

border:none;

border-top:1px dashed black;

margin:15px 0;

}



.no-print{

display:none !important;

}



.text-center{

text-align:center;

}



.font-bold{

font-weight:bold;

}



</style>


</head>


<body>


<div class="receipt">

${receipt.innerHTML}

</div>


</body>


</html>

`);




printWindow.document.close();



printWindow.focus();



setTimeout(()=>{

printWindow.print();

printWindow.close();

},500);


}





return (

<div
className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-[9999]
"
>



<div
className="
receipt
bg-white
w-[380px]
rounded-xl
shadow-2xl
p-5
font-mono
text-sm
relative
z-[10000]
"
>



<h2
className="
text-center
text-xl
font-bold
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
Receipt #
</span>

<span>
{receiptNo}
</span>

</div>



</div>





<hr className="border-dashed my-4"/>




<div className="space-y-3">


{
cart.map(item=>(

<div key={item.id}>


<div className="font-bold">

{item.name}

</div>



<div className="flex justify-between">


<span>

{item.quantity} x ₱{item.price.toFixed(2)}

</span>


<span>

₱{(
item.price * item.quantity
).toFixed(2)}

</span>


</div>


</div>


))

}


</div>






<hr className="border-dashed my-4"/>






<div className="space-y-2">


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





<div
className="
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






<p className="text-center text-xs">

THANK YOU ❤️

<br/>

Please Come Again

</p>






<div
className="
flex
gap-3
mt-5
no-print
"
>



<button

onClick={printReceipt}

className="
flex-1
bg-blue-600
hover:bg-blue-700
text-white
py-2
rounded-lg
font-bold
cursor-pointer
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
cursor-pointer
"

>

Close

</button>



</div>






</div>



</div>


);

}
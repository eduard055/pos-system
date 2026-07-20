import { useState } from "react";
import { useSettingsStore } from "../../../store/settingsStore";
import Users from "./Users";


export default function Settings(){


const vatRate = useSettingsStore(
  (state)=>state.vatRate
);


const setVatRate = useSettingsStore(
  (state)=>state.setVatRate
);



const [vat,setVat] = useState(vatRate);



function saveSettings(){


setVatRate(Number(vat));


alert(
`VAT Updated to ${vat}%`
);


}



return (

<div className="space-y-10">



{/* PAGE HEADER */}

<div>

<h1 className="text-3xl font-bold">

Settings

</h1>


<p className="text-slate-500">

Manage POS configuration

</p>


</div>






{/* VAT SETTINGS */}

<div
className="
bg-white
border
rounded-2xl
p-6
max-w-lg
"
>



<h2 className="
text-xl
font-bold
mb-5
">

Tax Settings

</h2>






<label
className="
block
font-semibold
mb-2
"
>

VAT Rate (%)

</label>





<input

type="number"

value={vat}

onChange={(e)=>
setVat(Number(e.target.value))
}


className="
border
rounded-lg
px-4
py-3
w-full
"


/>






<button


onClick={saveSettings}


className="
mt-5
bg-blue-600
hover:bg-blue-700
text-white
font-bold
px-6
py-3
rounded-xl
"


>

Save Settings

</button>







<div className="
mt-5
text-sm
text-slate-500
">

Current Saved VAT:

<strong className="ml-1">

{vatRate}%

</strong>


</div>





</div>









{/* USER MANAGEMENT */}


<div>


<h2 className="
text-2xl
font-bold
mb-5
">

User Management

</h2>



<Users />



</div>







</div>


);


} 
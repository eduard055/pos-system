import { useState } from "react";
import Papa from "papaparse";

import { useSalesStore } from "../../../store/salesStore";
import type { Sale } from "../../../store/salesStore";

import ReceiptViewer from "../components/ReceiptViewer";


export default function Reports() {


  const sales = useSalesStore(
    state => state.sales
  );


  const [selectedSale, setSelectedSale] =
    useState<Sale | null>(null);



  const [search,setSearch] =
    useState("");



  const filteredSales =
    sales.filter((sale)=>

      sale.receiptNo
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );



  const totalRevenue =
    filteredSales.reduce(
      (sum,sale)=>
        sum + sale.total,
      0
    );



  const totalTransactions =
    filteredSales.length;



  const totalVAT =
    filteredSales.reduce(
      (sum,sale)=>
        sum + sale.tax,
      0
    );



  const averageSale =
    totalTransactions > 0
    ?
    totalRevenue / totalTransactions
    :
    0;



  function exportCSV() {

  if (filteredSales.length === 0) {

    alert("No transactions available to export.");

    return;

  }


  const reportData =
    filteredSales.map(
      (sale) => ({

        Receipt_Number:
          sale.receiptNo,

        Date:
          sale.date,

        Time:
          sale.time,

        Items:
          sale.items.reduce(
            (sum, item) =>
              sum + item.quantity,
            0
          ),

        Subtotal:
          sale.subtotal,

        VAT:
          sale.tax,

        Total:
          sale.total,

        Cash:
          sale.cash,

        Change:
          sale.change

      })
    );



  const csv =
    Papa.unparse(reportData);



  const blob =
    new Blob(
      [csv],
      {
        type:
        "text/csv;charset=utf-8;"
      }
    );



  const url =
    URL.createObjectURL(blob);



  const link =
    document.createElement("a");


  link.href = url;


  link.setAttribute(
    "download",
    "POS-Sales-Report.csv"
  );


  document.body.appendChild(link);


  link.click();


  document.body.removeChild(link);


  URL.revokeObjectURL(url);


}




  return (

<div className="space-y-6">


<div>

<h1 className="text-3xl font-bold">

Reports

</h1>


<p className="text-slate-500">

Sales summary and transaction history.

</p>


</div>





{/* SUMMARY */}


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">


<div className="
bg-white
rounded-2xl
border
shadow-sm
p-6
">

<p className="text-slate-500">

Total Revenue

</p>


<h2 className="
text-3xl
font-bold
text-green-600
">

₱{totalRevenue.toFixed(2)}

</h2>


</div>




<div className="
bg-white
rounded-2xl
border
shadow-sm
p-6
">


<p className="text-slate-500">

Transactions

</p>


<h2 className="text-3xl font-bold">

{totalTransactions}

</h2>


</div>




<div className="
bg-white
rounded-2xl
border
shadow-sm
p-6
">


<p className="text-slate-500">

VAT Collected

</p>


<h2 className="
text-3xl
font-bold
text-blue-600
">

₱{totalVAT.toFixed(2)}

</h2>


</div>




<div className="
bg-white
rounded-2xl
border
shadow-sm
p-6
">


<p className="text-slate-500">

Average Sale

</p>


<h2 className="
text-3xl
font-bold
text-orange-600
">

₱{averageSale.toFixed(2)}

</h2>


</div>



</div>






{/* EXPORT */}


<div className="flex gap-4">


<button

onClick={exportCSV}

className="
bg-green-600
hover:bg-green-700
text-white
px-5
py-3
rounded-xl
font-bold
"

>

Export CSV

</button>




<button

onClick={()=>
window.print()
}

className="
bg-slate-800
hover:bg-black
text-white
px-5
py-3
rounded-xl
font-bold
"

>

Print Report

</button>



</div>






{/* SEARCH */}


<div className="
bg-white
rounded-2xl
border
p-5
">


<input

placeholder="
🔍 Search Receipt Number...
"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}


className="
w-full
border
rounded-xl
px-4
py-3
"

/>


</div>








{/* TABLE */}


<div className="
bg-white
rounded-2xl
border
overflow-hidden
">


<table className="w-full">


<thead className="bg-slate-100">

<tr>

<th className="p-4 text-left">
Action
</th>

<th className="p-4 text-left">
Receipt #
</th>


<th className="p-4 text-left">
Date
</th>


<th className="p-4 text-left">
Time
</th>


<th className="p-4 text-left">
Items
</th>


<th className="p-4 text-left">
Subtotal
</th>


<th className="p-4 text-left">
VAT
</th>


<th className="p-4 text-left">
Total
</th>


<th className="p-4 text-left">
Cash
</th>


<th className="p-4 text-left">
Change
</th>


</tr>

</thead>





<tbody>


{filteredSales.map((sale)=>(


<tr

key={sale.id}

className="
border-t
hover:bg-slate-50
"

>


<td className="p-4">

<button

onClick={()=>
setSelectedSale(sale)
}

className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
"

>

View

</button>


</td>




<td className="p-4">

{sale.receiptNo}

</td>


<td className="p-4">

{sale.date}

</td>


<td className="p-4">

{sale.time}

</td>



<td className="p-4">

{
sale.items.reduce(
(sum,item)=>
sum + item.quantity,
0
)
}

</td>



<td className="p-4">

₱{sale.subtotal.toFixed(2)}

</td>



<td className="p-4 text-blue-600">

₱{sale.tax.toFixed(2)}

</td>



<td className="
p-4
font-bold
text-green-600
">

₱{sale.total.toFixed(2)}

</td>



<td className="p-4">

₱{sale.cash.toFixed(2)}

</td>



<td className="p-4">

₱{sale.change.toFixed(2)}

</td>


</tr>


))}


</tbody>


</table>


</div>






{selectedSale && (

<ReceiptViewer

sale={selectedSale}

onClose={()=>
setSelectedSale(null)
}

/>

)}





</div>


);


}
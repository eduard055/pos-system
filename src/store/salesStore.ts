import { create } from "zustand";


export interface SaleItem {

  id: number;

  name: string;

  quantity: number;

  price: number;

}



export interface Sale {

  id: number;

  receiptNo: string;

  date: string;

  time: string;

  items: SaleItem[];

  subtotal: number;

  tax: number;

  total: number;

  cash: number;

  change: number;

}




interface SalesStore {

  sales: Sale[];

  addSale: (sale: Sale) => void;

  generateReceiptNumber: () => string;

}




export const useSalesStore = create<SalesStore>((set,get)=>( {


sales: [],



addSale:(sale)=>

set((state)=>({

sales:[

...state.sales,

sale

]

})),





generateReceiptNumber:()=>{

const sales = get().sales;


const nextNumber = sales.length + 1;


return String(nextNumber).padStart(5,"0");


}



}));
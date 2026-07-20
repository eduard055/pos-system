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


}



export const useSalesStore = create<SalesStore>((set) => ({



  sales: [],



  addSale: (sale) =>


    set((state) => ({


      sales: [

        ...state.sales,

        sale

      ]


    }))



}));
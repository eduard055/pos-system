import { create } from "zustand";
import { persist } from "zustand/middleware";


interface SettingsStore {

  vatRate: number;

  setVatRate: (rate:number)=>void;

}



export const useSettingsStore = create<SettingsStore>()(

persist(

(set)=>({

  // Default VAT
  vatRate:12,


  setVatRate:(rate)=>


    set({

      vatRate:rate

    })


}),


{
  name:"settings-storage"
}


)

);
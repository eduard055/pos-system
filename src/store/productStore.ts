import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface Product {

  id:number;

  code:string;

  name:string;

  category:string;

  price:number;

  stock:number;

  image:string;

  hasFlavor?:boolean;

  flavors?:string[];

}



interface ProductStore {


  products:Product[];


  addProduct:(product:Product)=>void;


  deleteProduct:(id:number)=>void;


  updateProduct:(
    id:number,
    product:Partial<Product>
  )=>void;


  decreaseStock:(
    id:number,
    quantity:number
  )=>void;


}



const flavors = [

"Cheezzy",
"Teriyaki",
"Gravy",
"BBQ",
"Salted Egg",
"Garlic Parmesan",
"Buffalo"

];



export const useProductStore = create<ProductStore>()(

persist(

(set)=>({


products:[



// SHAKES

{
id:1,
code:"SHK001",
name:"Avocado",
category:"Shake",
price:100,
stock:0,
image:"🥑"
},


{
id:2,
code:"SHK002",
name:"Mango",
category:"Shake",
price:100,
stock:0,
image:"🥭"
},


{
id:3,
code:"SHK003",
name:"Strawberry",
category:"Shake",
price:100,
stock:0,
image:"🍓"
},


{
id:4,
code:"SHK004",
name:"Guyabano",
category:"Shake",
price:100,
stock:0,
image:"🍈"
},



// CHICKEN WINGS FLAVOR BASE

{
id:5,
code:"CHKA001",
name:"6pcs Chicken Wings",
category:"Chicken Wings",
price:100,
stock:0,
image:"🍗",

hasFlavor:true,
flavors

},


{
id:6,
code:"CHKA002",
name:"12pcs Chicken Wings",
category:"Chicken Wings",
price:100,
stock:0,
image:"🍗",

hasFlavor:true,
flavors

},


{
id:7,
code:"CHKA003",
name:"24pcs Chicken Wings",
category:"Chicken Wings",
price:100,
stock:0,
image:"🍗",

hasFlavor:true,
flavors

},




// POPPERS

{
id:8,
code:"PPRA001",
name:"Poppers Ala Carte",
category:"Poppers",
price:100,
stock:0,
image:"🍗",

hasFlavor:true,
flavors

},




// BURGERS


{
id:9,
code:"BRG001",
name:"Classic Burger",
category:"Burger",
price:100,
stock:0,
image:"🍔"
},


{
id:10,
code:"BRG002",
name:"Cheese Burger",
category:"Burger",
price:100,
stock:0,
image:"🍔"
},


{
id:11,
code:"BRG003",
name:"Ultimate Burger",
category:"Burger",
price:100,
stock:0,
image:"🍔"
},




// FRIES


{
id:12,
code:"FRY001",
name:"Regular Fries",
category:"Fries",
price:100,
stock:0,
image:"🍟"
},


{
id:13,
code:"FRY002",
name:"Large Fries",
category:"Fries",
price:100,
stock:0,
image:"🍟"
},




// LEMONADE


{
id:14,
code:"LMD001",
name:"Ppino Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🍋"
},


{
id:15,
code:"LMD002",
name:"Yakult Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🍋"
},


{
id:16,
code:"LMD003",
name:"Chia Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🍋"
},


{
id:17,
code:"LMD004",
name:"Strawberry Syrup Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🍓"
},


{
id:18,
code:"LMD005",
name:"Blueberry Syrup Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🫐"
},


{
id:19,
code:"LMD006",
name:"Lychee Syrup Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🍋"
},


{
id:20,
code:"LMD007",
name:"Orange Syrup Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🍊"
},


{
id:21,
code:"LMD008",
name:"Classic Lemonade",
category:"Lemonade",
price:100,
stock:0,
image:"🍋"
},




// ADDONS


{
id:22,
code:"ADD001",
name:"Extra Sauce",
category:"Add-ons",
price:100,
stock:0,
image:"➕"
},


{
id:23,
code:"ADD002",
name:"Plain Rice",
category:"Add-ons",
price:100,
stock:0,
image:"🍚"
},


{
id:24,
code:"ADD003",
name:"Soda",
category:"Add-ons",
price:100,
stock:0,
image:"🥤"
},


{
id:25,
code:"ADD004",
name:"Popping Boba",
category:"Add-ons",
price:100,
stock:0,
image:"🧋"
},


{
id:26,
code:"ADD005",
name:"Nata",
category:"Add-ons",
price:100,
stock:0,
image:"🧋"
},




// COMBOS


{
id:27,
code:"C1",
name:"Chicken Wings + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🔥"
},


{
id:28,
code:"C2",
name:"Chicken Wings + Small Fries + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🔥"
},


{
id:29,
code:"C3",
name:"Chicken Wings + Classic Burger + Small Fries + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🔥"
},


{
id:30,
code:"B1",
name:"Classic Burger + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🍔"
},


{
id:31,
code:"B2",
name:"Classic Burger + Regular Fries + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🍔"
},


{
id:32,
code:"P1",
name:"Poppers + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🔥"
},


{
id:33,
code:"P2",
name:"Poppers + Regular Fries + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🔥"
},


{
id:34,
code:"P3",
name:"Poppers + Classic Burger + Regular Fries + Lemonade Classic",
category:"Combo",
price:100,
stock:0,
image:"🔥"
}



],




addProduct:(product)=>

set((state)=>({

products:[
...state.products,
product
]

})),




deleteProduct:(id)=>

set((state)=>({

products:
state.products.filter(
p=>p.id!==id
)

})),





updateProduct:(id,product)=>

set((state)=>({

products:
state.products.map((p)=>

p.id===id

?

{
...p,
...product
}

:

p

)

})),





decreaseStock:(id,quantity)=>

set((state)=>({

products:
state.products.map((p)=>

p.id===id

?

{
...p,

stock:Math.max(
0,
p.stock-quantity
)

}

:

p

)

}))



}),


{
name:"product-storage"
}

)

);
import { create } from "zustand";

const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:4000/api";


// =========================
// TYPES
// =========================

export interface ModifierOption {

  id:string;

  name:string;

  price:number;

}


export interface ModifierGroup {

  id:string;

  name:string;

  required:boolean;

  multiple:boolean;

  options:ModifierOption[];

}



export interface Product {

  id:string | number;

  code:string;

  name:string;

  category:string;

  price:number;

  stock:number;

  image:string;

  modifierGroups?:ModifierGroup[];

}




type ApiProduct = {

  id:string;

  sku:string;

  name:string;

  price:number|string;

  stockQuantity:number;

  image:string|null;


  category:{
    name:string;
  } | null;


  modifierGroups?:ModifierGroup[];

};





type ProductInput =
Omit<Product,"id">;





interface ProductStore {

  products:Product[];

  isLoading:boolean;

  error:string|null;


  fetchProducts:()=>Promise<void>;

  addProduct:(product:ProductInput)=>Promise<boolean>;

  updateProduct:
  (
    id:string|number,
    product:ProductInput
  )=>Promise<boolean>;


  deleteProduct:
  (
    id:string|number
  )=>Promise<boolean>;


  decreaseStock:
  (
    id:string|number,
    quantity:number
  )=>Promise<boolean>;

}





// =========================
// CONVERTER
// =========================


function fromApi(
  product:ApiProduct
):Product {


return {


id:product.id,


code:product.sku,


name:product.name,


category:
product.category?.name ??
"Uncategorized",


price:Number(product.price),


stock:product.stockQuantity,


image:
product.image ??
"📦",


modifierGroups:
product.modifierGroups ?? []


};


}





// =========================
// PAYLOAD
// =========================


function payload(
product:ProductInput
){


return {

name:product.name,

sku:product.code,

categoryId:product.category,

price:product.price,

stockQuantity:product.stock,

image:product.image,

};


}





// =========================
// REQUEST
// =========================


async function request(
path:string,
options?:RequestInit
){


const response =
await fetch(
`${API_URL}${path}`,
{

headers:{
"Content-Type":"application/json",
...options?.headers
},

...options

}
);



if(!response.ok){


const body =
await response.json()
.catch(()=>null);



throw new Error(
body?.message ??
"API Error"
);


}



return response.status===204
?
null
:
response.json();


}








// =========================
// STORE
// =========================


export const useProductStore =
create<ProductStore>(
(set,get)=>({


products:[],


isLoading:false,


error:null,






fetchProducts:async()=>{


set({
isLoading:true,
error:null
});



try{


const products =
await request(
"/products"
) as ApiProduct[];



set({

products:
products.map(fromApi),

isLoading:false

});



}
catch(error){


set({

error:
error instanceof Error
?
error.message
:
"Unable to load products",

isLoading:false

});


}


},






addProduct:async(product)=>{


try{


const created =
await request(
"/products",
{

method:"POST",

body:
JSON.stringify(
payload(product)
)

}
) as ApiProduct;



set({

products:[
...get().products,
fromApi(created)
]

});



return true;


}
catch(error){


set({

error:
error instanceof Error
?
error.message
:
"Unable to add product"

});


return false;


}


},







updateProduct:async(id,product)=>{


try{


const updated =
await request(
`/products/${id}`,
{

method:"PUT",

body:
JSON.stringify(
payload(product)
)

}
) as ApiProduct;



set({

products:
get().products.map(
item =>
item.id===id
?
fromApi(updated)
:
item
)

});



return true;



}
catch(error){


set({

error:
error instanceof Error
?
error.message
:
"Unable to update product"

});


return false;


}


},







deleteProduct:async(id)=>{


try{


await request(
`/products/${id}`,
{
method:"DELETE"
}
);



set({

products:
get().products.filter(
item =>
item.id!==id
)

});



return true;


}
catch(error){


set({

error:
error instanceof Error
?
error.message
:
"Unable to delete product"

});


return false;


}


},







decreaseStock:async(id,quantity)=>{


try{


const result =
await request(
`/products/${id}/stock`,
{

method:"PATCH",

body:
JSON.stringify({

quantity:-quantity,

reason:"POS checkout"

})

}
) as {
product:ApiProduct
};



set({

products:
get().products.map(
item =>
item.id===id
?
fromApi(result.product)
:
item
)

});



return true;



}
catch(error){


set({

error:
error instanceof Error
?
error.message
:
"Unable to update stock"

});


return false;


}


}


})
);  
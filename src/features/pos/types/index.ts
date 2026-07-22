export interface Product {

  id:string | number;

  name:string;

  price:number;

  category:string;

  image:string;
  hasFlavor?: boolean;
  flavors?: string[];
  hasSize?: boolean;
  sizes?: { name: string; price: number }[];
  hasFriesFlavor?: boolean;
  friesFlavors?: string[];

}



export interface CartItem extends Product {

  quantity:number;

}

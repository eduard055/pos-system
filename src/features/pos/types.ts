export interface ModifierOption {
  id: string;
  name: string;
  price: number;
}


export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  options: ModifierOption[];
}


export interface Product {

  id: string | number;

  name: string;

  price: number;

  stock: number;

  image: string;

  category: string;


  // NEW MODIFIER ENGINE

  modifierGroups?: ModifierGroup[];


  // OLD POS SUPPORT

  hasSize?: boolean;

  hasFlavor?: boolean;

  hasFriesFlavor?: boolean;


  sizes?: {
    name:string;
    price:number;
  }[];

  flavors?: string[];

  friesFlavors?: string[];

}
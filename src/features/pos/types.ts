export interface Product {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  hasFlavor?: boolean;
  flavors?: string[];
  hasSize?: boolean;
  sizes?: { name: string; price: number }[];
  hasFriesFlavor?: boolean;
  friesFlavors?: string[];
}

export interface Product {

  id: string | number;

  code?: string;

  name: string;

  category: string;

  price: number;

  stock: number;

  image: string;
  hasFlavor?: boolean;
  flavors?: string[];
  hasSize?: boolean;
  sizes?: { name: string; price: number }[];
  hasFriesFlavor?: boolean;
  friesFlavors?: string[];

  options?: {

    title: string;

    values: {

      name: string;

      price?: number;

    }[];

  };

}

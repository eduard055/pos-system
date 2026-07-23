import { create } from "zustand";
import type { Product } from "../types";

export interface CartItem extends Product {
  quantity: number;

  originalProductId?: string | number;

  selectedFlavor?: {
    id: string | number;
    name: string;
    price: number;
  };

  addons?: {
    id: string | number;
    name: string;
    price: number;
  }[];
}

interface CartStore {
  cart: CartItem[];

  addToCart: (product: Product) => void;

  increaseQuantity: (id: string | number) => void;

  decreaseQuantity: (id: string | number) => void;

  removeItem: (id: string | number) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({

  cart: [],

  addToCart: (product) =>

    set((state) => {

      const item = product as CartItem;

      const existing = state.cart.find(cartItem =>

        cartItem.id === item.id &&

        JSON.stringify(cartItem.selectedFlavor) ===
        JSON.stringify(item.selectedFlavor) &&

        JSON.stringify(cartItem.addons) ===
        JSON.stringify(item.addons)

      );

      if (existing) {

        return {

          cart: state.cart.map(cartItem =>

            cartItem.id === existing.id &&

            JSON.stringify(cartItem.selectedFlavor) ===
            JSON.stringify(item.selectedFlavor) &&

            JSON.stringify(cartItem.addons) ===
            JSON.stringify(item.addons)

              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                }

              : cartItem

          ),

        };

      }

      return {

        cart: [

          ...state.cart,

          {
            ...item,
            quantity: 1,
          },

        ],

      };

    }),

  increaseQuantity: (id) =>

    set((state) => ({

      cart: state.cart.map(item =>

        item.id === id

          ? {
              ...item,
              quantity: item.quantity + 1,
            }

          : item

      ),

    })),

  decreaseQuantity: (id) =>

    set((state) => ({

      cart: state.cart

        .map(item =>

          item.id === id

            ? {
                ...item,
                quantity: item.quantity - 1,
              }

            : item

        )

        .filter(item => item.quantity > 0),

    })),

  removeItem: (id) =>

    set((state) => ({

      cart: state.cart.filter(item => item.id !== id),

    })),

  clearCart: () =>

    set({

      cart: [],

    }),

}));
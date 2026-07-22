import type { CartItem as CartItemType } from "../store/cartStore";

interface Props {
  item: CartItemType;

  increaseQuantity: (id: string | number) => void;

  decreaseQuantity: (id: string | number) => void;

  removeItem: (id: string | number) => void;
}

export default function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}: Props) {
  return (
    <div className="border-b pb-4 mb-4">

      <div className="flex justify-between">

        <h3 className="font-semibold">
          {item.image} {item.name}
        </h3>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500"
        >
          ✕
        </button>

      </div>

      <div className="flex justify-between items-center mt-3">

        <div className="flex items-center gap-3">

          <button
            onClick={() => decreaseQuantity(item.id)}
            className="px-3 py-1 bg-slate-200 rounded"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            +
          </button>

        </div>

        <div className="font-bold">
          ₱{(item.price * item.quantity).toFixed(2)}
        </div>

      </div>

    </div>
  );
}

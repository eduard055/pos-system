import type { Product } from "../types";

interface Props {
  product: Product;
  onSelect: (size: string, price: number) => void;
  onClose: () => void;
}

export default function ShakeSizeModal({
  product,
  onSelect,
  onClose,
}: Props) {

  if (!product.sizes) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[350px]">

        <h2 className="text-xl font-bold mb-4 text-center">
          Select Size
        </h2>

        <div className="space-y-3">

          {product.sizes.map((size) => (

            <button
              key={size.name}
              onClick={() => onSelect(size.name, size.price)}
              className="
              w-full
              border
              rounded-xl
              p-3
              hover:bg-blue-600
              hover:text-white
              transition
              "
            >
              <div className="font-bold">
                {size.name}
              </div>

              <div>
                ₱{size.price.toFixed(2)}
              </div>

            </button>

          ))}

        </div>

        <button
          onClick={onClose}
          className="
          mt-5
          w-full
          border
          rounded-xl
          py-3
          "
        >
          Cancel
        </button>

      </div>

    </div>
  );
}
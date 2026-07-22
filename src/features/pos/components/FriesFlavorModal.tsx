import type { Product } from "../types";

interface Props {
  product: Product;
  onSelect: (flavor: string) => void;
  onClose: () => void;
}

export default function FriesFlavorModal({
  product,
  onSelect,
  onClose,
}: Props) {

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
        bg-white
        rounded-2xl
        p-6
        w-[360px]
        shadow-xl
        "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-5
          text-center
          "
        >
          Choose Fries Flavor
        </h2>

        <div className="space-y-3">

          {product.friesFlavors?.map((flavor) => (

            <button
              key={flavor}
              onClick={() => onSelect(flavor)}
              className="
              w-full
              py-3
              rounded-xl
              border
              hover:bg-yellow-100
              transition
              font-semibold
              "
            >
              {flavor}
            </button>

          ))}

        </div>

        <button
          onClick={onClose}
          className="
          mt-5
          w-full
          py-3
          rounded-xl
          bg-gray-200
          hover:bg-gray-300
          "
        >
          Cancel
        </button>

      </div>

    </div>

  );

}
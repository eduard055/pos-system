
console.log("RECEIPT VIEWER LOADED");   
import type { Sale } from "../../../store/salesStore";

interface Props {
  sale: Sale;
  onClose: () => void;
}

export default function ReceiptViewer({
  sale,
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
        w-[380px]
        rounded-3xl
        shadow-2xl
        p-8
        "
      >
        <h1 className="text-3xl font-bold text-center">
          POS PRO
        </h1>

        <p className="text-center text-slate-500">
          Receipt
        </p>

        <hr className="my-4" />

        <p>Date: {sale.date}</p>

        <hr className="my-4" />

        <div className="space-y-2">
          {sale.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between"
            >
              <span>
                {item.name} x{item.quantity}
              </span>

              <span>
                ₱{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₱{sale.subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₱{sale.tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₱{sale.total.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between">
            <span>Cash</span>
            <span>₱{sale.cash.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Change</span>
            <span>₱{sale.change.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="
          mt-8
          w-full
          border
          py-3
          rounded-xl
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
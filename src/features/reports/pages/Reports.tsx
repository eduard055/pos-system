import { useState } from "react";
import { useSalesStore } from "../../../store/salesStore";
import type { Sale } from "../../../store/salesStore";
import ReceiptViewer from "../components/ReceiptViewer";

export default function Reports() {

  const sales = useSalesStore(state => state.sales);

  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalTransactions = sales.length;

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-slate-500">
          Sales summary and transaction history.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl border p-6">

          <h2 className="text-slate-500">
            Total Revenue
          </h2>

          <p className="text-3xl font-bold mt-2">
            ₱{totalRevenue.toFixed(2)}
          </p>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <h2 className="text-slate-500">
            Transactions
          </h2>

          <p className="text-3xl font-bold mt-2">
            {totalTransactions}
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Actions
              </th>

              <th className="p-4 text-left">
                Date
              </th>
              <th className="p-4 text-left">
                Time
              </th>

              <th className="p-4 text-left">
                Items
              </th>

              <th className="p-4 text-left">
                Subtotal
              </th>

              <th className="p-4 text-left">
                Tax
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Cash
              </th>

              <th className="p-4 text-left">
                Change
              </th>

            </tr>

          </thead>

          <tbody>

            {sales.map((sale) => (

              <tr
                key={sale.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">

                  <button
                    onClick={() => setSelectedSale(sale)}
                    className="
                    bg-blue-600
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    "
                  >
                    View Receipt
                  </button>

                </td>

                <td className="p-4">
                  {sale.date}
                </td>

                <td className="p-4">
                  {sale.time}
                </td>

                <td className="p-4">
                  {sale.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </td>

                <td className="p-4">
                  ₱{sale.subtotal.toFixed(2)}
                </td>

                <td className="p-4">
                  ₱{sale.tax.toFixed(2)}
                </td>

                <td className="p-4 font-bold">
                  ₱{sale.total.toFixed(2)}
                </td>

                <td className="p-4 text-green-600">
                  ₱{sale.cash.toFixed(2)}
                </td>

                <td className="p-4 text-blue-600">
                  ₱{sale.change.toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedSale && (

        <ReceiptViewer

          sale={selectedSale}

          onClose={() => setSelectedSale(null)}

        />

      )}

    </div>

  );

}
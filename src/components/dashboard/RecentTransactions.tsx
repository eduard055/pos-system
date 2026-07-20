import { useSalesStore } from "../../store/salesStore";

export default function RecentTransactions() {

  const sales = useSalesStore((state) => state.sales);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-bold mb-4">
        Recent Transactions
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="py-3">
              Receipt ID
            </th>

            <th>
              Product
            </th>

            <th>
              Qty
            </th>

            <th>
              Total
            </th>

          </tr>

        </thead>

        <tbody>

          {sales
            .slice()
            .reverse()
            .slice(0, 5)
            .map((sale) => {

              const quantity = sale.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              );

              const productNames = sale.items
                .map((item) => item.name)
                .join(", ");

              return (

                <tr
                  key={sale.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-3">
                    #{String(sale.id).slice(-4)}
                  </td>

                  <td>
                    {productNames}
                  </td>

                  <td>
                    {quantity}
                  </td>

                  <td className="font-semibold">
                    ₱{sale.total.toFixed(2)}
                  </td>

                </tr>

              );

            })}

          {sales.length === 0 && (

            <tr>

              <td
                colSpan={4}
                className="text-center py-6 text-slate-400"
              >
                No transactions yet.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );

}
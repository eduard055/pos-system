import { useProductStore } from "../../store/productStore";

export default function LowStock() {

  const products = useProductStore(
    (state) => state.products
  );

  const lowStockProducts = products.filter(
    (product) => product.stock <= 10
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-bold mb-4">
        Low Stock
      </h2>

      {lowStockProducts.length > 0 ? (

        lowStockProducts.map((product) => (

          <div
            key={product.id}
            className="flex justify-between items-center py-3 border-b"
          >

            <div className="flex items-center gap-3">

              <span className="text-2xl">
                {product.image}
              </span>

              <span>
                {product.name}
              </span>

            </div>

            <span className="text-red-500 font-bold">
              {product.stock}
            </span>

          </div>

        ))

      ) : (

        <p className="text-slate-500">
          🎉 No low stock products.
        </p>

      )}

    </div>
  );

}
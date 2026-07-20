import { useState } from "react";
import { useProductStore } from "../../../store/productStore";
import ProductModal from "../components/ProductModal";
import type { Product } from "../../../store/productStore";

export default function Inventory() {
  const products = useProductStore((state) => state.products);

  const deleteProduct = useProductStore(
    (state) => state.deleteProduct
  );

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | undefined>();

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  function handleAdd() {
    setSelectedProduct(undefined);
    setShowModal(true);
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product);
    setShowModal(true);
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3 flex-1"
          />

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="border rounded-lg p-3 w-48"
          >
            <option>All</option>
            <option>Drinks</option>
            <option>Bakery</option>
            <option>Snacks</option>
            <option>Meals</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                Image
              </th>

              <th className="text-left p-3">
                Product
              </th>

              <th className="text-left p-3">
                Category
              </th>

              <th className="text-left p-3">
                Price
              </th>

              <th className="text-left p-3">
                Stock
              </th>

              <th className="text-left p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3 text-3xl">
                  {product.image}
                </td>

                <td className="p-3 font-medium">
                  {product.name}
                </td>

                <td className="p-3">
                  {product.category}
                </td>

                <td className="p-3">
                  ₱{product.price.toLocaleString()}
                </td>

               <td className="p-3">
                {product.stock === 0 ? (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                    </span>
                ) : product.stock <= 10 ? (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Low Stock ({product.stock})
                    </span>
                ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock ({product.stock})
                    </span>
                )}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit(product)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Delete "${product.name}"?`
                          )
                        ) {
                          deleteProduct(product.id);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
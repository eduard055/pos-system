import { useProductStore } from "../../../store/productStore";
import { useEffect, useState } from "react";
import type { Product } from "../../../store/productStore";

interface Props {
  onClose: () => void;
  product?: Product;
}

export default function ProductModal({
  onClose,
  product,
}: Props) {
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const [productType, setProductType] = useState("Standard");

  useEffect(() => {
    setCode(product?.code || "");
    setName(product?.name || "");
    setCategory(product?.category || "");
    setPrice(product ? String(product.price) : "");
    setStock(product ? String(product.stock) : "");
    setImage(product?.image || "");

    if (product?.hasSize) {
      setProductType("Size");
    } else if (product?.hasFlavor) {
      setProductType("Flavor");
    } else if (product?.hasFriesFlavor) {
      setProductType("Fries Flavor");
    } else {
      setProductType("Standard");
    }
  }, [product]);

  async function handleSave() {
    if (
      !code ||
      !name ||
      !category ||
      !price ||
      !stock ||
      !image
    ) {
      alert("Please complete all fields.");
      return;
    }

    const newProduct = {
      code,
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      image,
    };

    const saved = product
      ? await updateProduct(product.id, newProduct)
      : await addProduct(newProduct);
    if (saved) onClose();
    else alert("Unable to save product. Check that the API is running and the SKU is unique.");
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-[400px] shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-5">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <input
          placeholder="Product Code (BRG001)"
          value={code}
          className="border p-3 w-full mb-3 rounded-lg"
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          placeholder="Product Name"
          value={name}
          className="border p-3 w-full mb-3 rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 w-full mb-3 rounded-lg"
        >
          <option value="">Select Category</option>

          <option value="Shake">Shake</option>

          <option value="Chicken Wings">
            Chicken Wings
          </option>

          <option value="Poppers">
            Poppers
          </option>

          <option value="Burger">
            Burger
          </option>

          <option value="Fries">
            Fries
          </option>

          <option value="Lemonade">
            Lemonade
          </option>

          <option value="Add-ons">
            Add-ons
          </option>

          <option value="Combo">
            Combo
          </option>
        </select>

        {/* PRODUCT TYPE */}
        <select
          value={productType}
          onChange={(e) =>
            setProductType(e.target.value)
          }
          className="border p-3 w-full mb-3 rounded-lg"
        >
          <option value="Standard">
            Standard Product
          </option>

          <option value="Size">
            Has Sizes
          </option>

          <option value="Flavor">
            Has Flavors
          </option>

          <option value="Fries Flavor">
            Has Fries Flavors
          </option>
        </select>

        <input
          placeholder="Price"
          type="number"
          value={price}
          className="border p-3 w-full mb-3 rounded-lg"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Stock"
          type="number"
          value={stock}
          className="border p-3 w-full mb-3 rounded-lg"
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          placeholder="Emoji (🍔)"
          value={image}
          className="border p-3 w-full mb-5 rounded-lg"
          onChange={(e) => setImage(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
          >
            {product ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

console.log("SETTINGS PAGE LOADED");

export default function Settings() {

  const [storeName, setStoreName] = useState("POS PRO");
  const [taxRate, setTaxRate] = useState(12);
  const [currency, setCurrency] = useState("₱");
  const [cashier, setCashier] = useState("Admin");

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-slate-500">
          Configure your POS system.
        </p>

      </div>

      <div className="bg-white rounded-2xl border p-6 space-y-5">

        <div>

          <label className="block font-semibold mb-2">
            Store Name
          </label>

          <input
            value={storeName}
            onChange={(e)=>setStoreName(e.target.value)}
            className="border rounded-lg p-3 w-full"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Cashier Name
          </label>

          <input
            value={cashier}
            onChange={(e)=>setCashier(e.target.value)}
            className="border rounded-lg p-3 w-full"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Tax Rate (%)
          </label>

          <input
            type="number"
            value={taxRate}
            onChange={(e)=>setTaxRate(Number(e.target.value))}
            className="border rounded-lg p-3 w-full"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Currency
          </label>

          <select
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}
            className="border rounded-lg p-3 w-full"
          >

            <option value="₱">Philippine Peso (₱)</option>
            <option value="$">US Dollar ($)</option>
            <option value="€">Euro (€)</option>
            <option value="¥">Japanese Yen (¥)</option>

          </select>

        </div>

        <button
          className="
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          font-bold
          "
        >
          Save Settings
        </button>

      </div>

    </div>

  );

}
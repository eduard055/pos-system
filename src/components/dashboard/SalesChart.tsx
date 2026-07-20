import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import { useSalesStore } from "../../store/salesStore";

export default function SalesChart() {

  const sales = useSalesStore((state) => state.sales);

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const data = weekDays.map((day) => {

    const totalSales = sales
      .filter((sale) => {

        const saleDay = new Date(
          `${sale.date} ${sale.time}`
        ).toLocaleDateString("en-US", {
          weekday: "short",
        });

        return saleDay === day;

      })
      .reduce(
        (sum, sale) => sum + sale.total,
        0
      );

    return {
      day,
      sales: totalSales,
    };

  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border mt-8">

      <h2 className="text-xl font-bold mb-6">
        Sales Overview
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <XAxis dataKey="day" />

            <Tooltip
            formatter={(value) => {
              const amount = Number(value ?? 0);
              return [`₱${amount.toFixed(2)}`, "Sales"];
            }}
          />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              fill="#93c5fd"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );

}
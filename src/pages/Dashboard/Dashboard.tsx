import {
  DollarSign,
  Package,
  ShoppingCart,
  TriangleAlert,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import SalesChart from "../../components/dashboard/SalesChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import LowStock from "../../components/dashboard/LowStock";
import PageHeader from "../../components/ui/PageHeader";

import { useSalesStore } from "../../store/salesStore";
import { useProductStore } from "../../store/productStore";

export default function Dashboard() {

  const sales = useSalesStore((state) => state.sales);

  const products = useProductStore((state) => state.products);

  const totalSales = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalOrders = sales.length;

  const totalProducts = products.length;

  const lowStock = products.filter(
    product => product.stock <= 10
  ).length;

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin 👋"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Today's Sales"
          value={`₱${totalSales.toLocaleString()}`}
          icon={DollarSign}
        />

        <StatCard
          title="Orders"
          value={String(totalOrders)}
          icon={ShoppingCart}
        />

        <StatCard
          title="Products"
          value={String(totalProducts)}
          icon={Package}
        />

        <StatCard
          title="Low Stock"
          value={String(lowStock)}
          icon={TriangleAlert}
        />

      </div>

      <SalesChart />

      <div className="grid gap-6 mt-8 lg:grid-cols-2">
        <RecentTransactions />
        <LowStock />
      </div>
    </>
  );
}
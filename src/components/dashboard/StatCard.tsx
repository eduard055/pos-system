import type { LucideIcon } from "lucide-react";
import Card from "../ui/Card";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-green-600">
            ↑ 12% from yesterday
          </p>
        </div>

        <div className="rounded-xl bg-blue-100 p-4">
          <Icon className="h-7 w-7 text-blue-600" />
        </div>

      </div>
    </Card>
  );
}

import { BackButton } from "@/components/BackButton";
import { TopProductsChart } from "@/components/charts/TopProductsChart";
import { StockVariationChart } from "@/components/charts/StockVariationChart";
import { SupplierPerformanceChart } from "@/components/charts/SupplierPerformanceChart";

export default function Reports() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <BackButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TopProductsChart />
        <StockVariationChart />
        <SupplierPerformanceChart />
      </div>
    </div>
  );
}

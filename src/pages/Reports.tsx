
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { TopProductsChart } from "@/components/charts/TopProductsChart";
import { StockVariationChart } from "@/components/charts/StockVariationChart";
import { SupplierPerformanceChart } from "@/components/charts/SupplierPerformanceChart";
import { MonthlyRevenueChart } from "@/components/charts/MonthlyRevenueChart";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

export default function Reports() {
  const handleExportPDF = () => {
    toast.info("Exportando relatório em PDF...");
    // Implementation for PDF export would go here
  };

  const handleExportExcel = () => {
    toast.info("Exportando relatório em Excel...");
    // Implementation for Excel export would go here
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-3xl font-bold">Relatórios</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleExportPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <MonthlyRevenueChart />
        <TopProductsChart />
        <StockVariationChart />
        <SupplierPerformanceChart />
      </div>
    </div>
  );
}

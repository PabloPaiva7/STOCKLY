
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { TopProductsChart } from "@/components/charts/TopProductsChart";
import { StockVariationChart } from "@/components/charts/StockVariationChart";
import { SupplierPerformanceChart } from "@/components/charts/SupplierPerformanceChart";
import { MonthlyRevenueChart } from "@/components/charts/MonthlyRevenueChart";
import { FinancialOverview } from "@/components/charts/FinancialOverview";
import { StockReconciliation } from "@/components/charts/StockReconciliation";
import { CustomerHistory } from "@/components/charts/CustomerHistory";
import { FilteredSales } from "@/components/charts/FilteredSales";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
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

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-6">Controle Financeiro e Inventário</h2>
              <FinancialOverview />
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-6">Conferência e Histórico</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <StockReconciliation />
                <CustomerHistory />
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-6">Análise de Vendas</h2>
              <FilteredSales />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}


import { LowStockList } from "@/components/LowStockList";
import { BackButton } from "@/components/BackButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function LowStock() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-3xl font-bold">Produtos com Estoque Baixo</h1>
            </div>

            <LowStockList />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

import { Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { MovimentacoesChart } from "@/components/MovimentacoesChart";
import { AlertaEstoque } from "@/components/AlertaEstoque";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/produtos/novo">
                  <Package className="mr-2 h-5 w-5" />
                  Adicionar Novo Produto
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total em Estoque"
                value="1,234"
                icon={Package}
                trend={{ value: 12, isPositive: true }}
              />
              <MetricCard
                title="Estoque Baixo"
                value="8"
                icon={AlertTriangle}
                className="border-orange-200"
              />
              <MetricCard
                title="Pedidos Pendentes"
                value="25"
                icon={ShoppingCart}
              />
              <MetricCard
                title="Valor Total"
                value="R$ 45.850"
                icon={TrendingUp}
                trend={{ value: 8, isPositive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MovimentacoesChart />
              </div>
              <div>
                <AlertaEstoque />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

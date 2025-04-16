
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderList } from "@/components/OrderList";
import { useState } from "react";
import { CreateOrderSheet } from "@/components/CreateOrderSheet";
import { BackButton } from "@/components/BackButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function Orders() {
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BackButton />
                <h1 className="text-3xl font-bold">Pedidos de Saída</h1>
              </div>
              <Button onClick={() => setIsCreateOrderOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar novo pedido
              </Button>
            </div>

            <OrderList />
            
            <CreateOrderSheet 
              open={isCreateOrderOpen} 
              onOpenChange={setIsCreateOrderOpen}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

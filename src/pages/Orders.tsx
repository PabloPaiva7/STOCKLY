
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderList } from "@/components/OrderList";
import { useState } from "react";
import { CreateOrderSheet } from "@/components/CreateOrderSheet";

export default function Orders() {
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pedidos de Saída</h1>
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
  );
}

import { LowStockList } from "@/components/LowStockList";
import { BackButton } from "@/components/BackButton";

export default function LowStock() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl font-bold">Produtos com Estoque Baixo</h1>
      </div>

      <LowStockList />
    </div>
  );
}

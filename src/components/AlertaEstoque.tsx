
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const alertas = [
  { produto: "Notebook Dell", quantidade: 2, minimo: 5 },
  { produto: "Monitor LG 24'", quantidade: 3, minimo: 8 },
  { produto: "Mouse Wireless", quantidade: 4, minimo: 10 },
];

export function AlertaEstoque() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold">Alerta de Estoque Baixo</h3>
      </div>
      <div className="space-y-4">
        {alertas.map((alerta) => (
          <div key={alerta.produto} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{alerta.produto}</p>
              <p className="text-sm text-muted-foreground">
                Min: {alerta.minimo} | Atual: {alerta.quantidade}
              </p>
            </div>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-sm">
              Baixo
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

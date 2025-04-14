
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Temporary mock data - replace with real data when connecting to backend
const movements = [
  {
    id: 1,
    date: "2024-04-14",
    product: "Notebook Dell",
    type: "saída",
    quantity: 2,
    reason: "Venda",
  },
  {
    id: 2,
    date: "2024-04-13",
    product: "Monitor LG 24'",
    type: "entrada",
    quantity: 5,
    reason: "Reposição",
  },
  {
    id: 3,
    date: "2024-04-12",
    product: "Mouse Wireless",
    type: "saída",
    quantity: 1,
    reason: "Devolução",
  },
];

export function StockMovementHistory() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Histórico de Movimentações</h2>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Motivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{new Date(movement.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{movement.product}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {movement.type === "entrada" ? (
                        <ArrowUpCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownCircle className="h-4 w-4 text-red-500" />
                      )}
                      {movement.type}
                    </div>
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </Card>
  );
}

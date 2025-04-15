
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardCheck } from "lucide-react";

const stockData = [
  { 
    produto: "Monitor LG 24\"",
    sistemaQtd: 50,
    contagem: 48,
    diferenca: -2,
    ultimaContagem: "2025-04-14"
  },
  {
    produto: "Teclado Mecânico",
    sistemaQtd: 30,
    contagem: 30,
    diferenca: 0,
    ultimaContagem: "2025-04-14"
  },
  {
    produto: "Mouse Wireless",
    sistemaQtd: 45,
    contagem: 43,
    diferenca: -2,
    ultimaContagem: "2025-04-14"
  }
];

export function StockReconciliation() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Conferência de Estoque</CardTitle>
        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Sistema</TableHead>
                <TableHead>Contagem</TableHead>
                <TableHead>Diferença</TableHead>
                <TableHead>Última Contagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockData.map((item) => (
                <TableRow key={item.produto}>
                  <TableCell>{item.produto}</TableCell>
                  <TableCell>{item.sistemaQtd}</TableCell>
                  <TableCell>{item.contagem}</TableCell>
                  <TableCell className={item.diferenca < 0 ? "text-red-500" : "text-green-500"}>
                    {item.diferenca}
                  </TableCell>
                  <TableCell>{item.ultimaContagem}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

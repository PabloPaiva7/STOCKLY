
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
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const customerData = [
  {
    cliente: "João Silva",
    compras: 12,
    ticketMedio: 850,
    ultimaCompra: "2025-04-10",
    status: "Recorrente"
  },
  {
    cliente: "Maria Santos",
    compras: 5,
    ticketMedio: 1200,
    ultimaCompra: "2025-04-08",
    status: "Regular"
  },
  {
    cliente: "Pedro Oliveira",
    compras: 3,
    ticketMedio: 450,
    ultimaCompra: "2025-04-05",
    status: "Novo"
  }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export function CustomerHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Histórico de Clientes</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Compras</TableHead>
                <TableHead>Ticket Médio</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerData.map((customer) => (
                <TableRow key={customer.cliente}>
                  <TableCell>{customer.cliente}</TableCell>
                  <TableCell>{customer.compras}</TableCell>
                  <TableCell>{formatCurrency(customer.ticketMedio)}</TableCell>
                  <TableCell>{customer.ultimaCompra}</TableCell>
                  <TableCell>
                    <Badge variant={
                      customer.status === "Recorrente" ? "default" :
                      customer.status === "Regular" ? "secondary" : "outline"
                    }>
                      {customer.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

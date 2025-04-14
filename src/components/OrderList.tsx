
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Temporary mock data - replace with real data when connecting to backend
const orders = [
  {
    id: 1,
    requester: "Departamento de TI",
    date: "2024-04-14",
    status: "pendente",
    products: [
      { name: "Monitor LG 24'", quantity: 2 },
      { name: "Mouse Wireless", quantity: 5 },
    ],
    notes: "Urgente - Novo funcionário",
  },
  {
    id: 2,
    requester: "João Silva",
    date: "2024-04-13",
    status: "separado",
    products: [
      { name: "Notebook Dell", quantity: 1 },
    ],
    notes: "",
  },
];

const statusColors = {
  pendente: "yellow",
  separado: "blue",
  enviado: "green",
} as const;

export function OrderList() {
  const handleFinishOrder = (orderId: number) => {
    // Implement order completion logic when connected to backend
    console.log("Finishing order:", orderId);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Solicitante</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Produtos</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.requester}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.name} ({product.quantity} un)
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <Badge variant={statusColors[order.status as keyof typeof statusColors]}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.notes}</TableCell>
              <TableCell>
                {order.status !== "enviado" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFinishOrder(order.id)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Finalizar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

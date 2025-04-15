
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListFilter } from "lucide-react";

const salesData = [
  {
    data: "2025-04-14",
    produto: "Monitor LG 24\"",
    vendedor: "Ana Silva",
    fornecedor: "LG Electronics",
    valor: 1200
  },
  {
    data: "2025-04-13",
    produto: "Teclado Mecânico",
    vendedor: "Carlos Santos",
    fornecedor: "Logitech",
    valor: 450
  },
  {
    data: "2025-04-12",
    produto: "Mouse Wireless",
    vendedor: "Ana Silva",
    fornecedor: "Logitech",
    valor: 180
  }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export function FilteredSales() {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Vendas Realizadas</CardTitle>
        <ListFilter className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="semana">Última Semana</SelectItem>
              <SelectItem value="mes">Último Mês</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Produto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monitor">Monitor LG</SelectItem>
              <SelectItem value="teclado">Teclado</SelectItem>
              <SelectItem value="mouse">Mouse</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Vendedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ana">Ana Silva</SelectItem>
              <SelectItem value="carlos">Carlos Santos</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Fornecedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lg">LG Electronics</SelectItem>
              <SelectItem value="logitech">Logitech</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[300px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>{sale.data}</TableCell>
                  <TableCell>{sale.produto}</TableCell>
                  <TableCell>{sale.vendedor}</TableCell>
                  <TableCell>{sale.fornecedor}</TableCell>
                  <TableCell>{formatCurrency(sale.valor)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

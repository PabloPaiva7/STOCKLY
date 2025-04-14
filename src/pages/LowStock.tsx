
import { Package, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { StockMovementHistory } from "@/components/StockMovementHistory";
import { ScrollArea } from "@/components/ui/scroll-area";

// Temporary mock data - replace with real data when connecting to backend
const lowStockProducts = [
  {
    id: 1,
    name: "Notebook Dell",
    sku: "DELL-NOT-001",
    category: "Eletrônicos",
    currentStock: 2,
    minStock: 5,
    supplier: "Dell Computers",
  },
  {
    id: 2,
    name: "Monitor LG 24'",
    sku: "LG-MON-24",
    category: "Eletrônicos",
    currentStock: 3,
    minStock: 8,
    supplier: "LG Electronics",
  },
  {
    id: 3,
    name: "Mouse Wireless",
    sku: "MS-WIRE-001",
    category: "Periféricos",
    currentStock: 4,
    minStock: 10,
    supplier: "Logitech",
  },
];

const categories = ["Todas", "Eletrônicos", "Periféricos", "Acessórios"];
const suppliers = ["Todos", "Dell Computers", "LG Electronics", "Logitech"];

const LowStock = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-red-500" />
                <h1 className="text-3xl font-bold">Produtos com Baixo Estoque</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Filtros</span>
                    </div>
                    <div className="flex gap-4">
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Fornecedor" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier} value={supplier.toLowerCase()}>
                              {supplier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <ScrollArea className="h-[400px] rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produto</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Estoque Atual</TableHead>
                          <TableHead>Estoque Mínimo</TableHead>
                          <TableHead>Fornecedor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowStockProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">
                              {product.name}
                            </TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell className="text-red-500">
                              {product.currentStock}
                            </TableCell>
                            <TableCell>{product.minStock}</TableCell>
                            <TableCell>{product.supplier}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </Card>

              <StockMovementHistory />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LowStock;


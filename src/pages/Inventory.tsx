
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { BackButton } from "@/components/BackButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

// Mock data for inventory products
type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  currentStock: number;
  minStock: number;
  supplier: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "Parafuso Philips 4x40mm",
    sku: "PP-4x40",
    category: "Fixadores",
    price: 0.75,
    currentStock: 15,
    minStock: 50,
    supplier: "Fixadores Ltda"
  },
  {
    id: "2",
    name: "Cabo Elétrico 2.5mm (metro)",
    sku: "CE-2.5",
    category: "Material Elétrico",
    price: 3.25,
    currentStock: 28,
    minStock: 100,
    supplier: "Eletro Condutores"
  },
  {
    id: "3",
    name: "Tinta Acrílica Branca 18L",
    sku: "TA-BR-18L",
    category: "Tintas",
    price: 289.90,
    currentStock: 3,
    minStock: 10,
    supplier: "Tintas Colormax"
  },
  {
    id: "4",
    name: "Fita Isolante Preta (rolo)",
    sku: "FI-PR",
    category: "Material Elétrico",
    price: 5.90,
    currentStock: 12,
    minStock: 30,
    supplier: "Material Elétrico SA"
  },
  {
    id: "5",
    name: "Luva de Proteção G (par)",
    sku: "LP-G",
    category: "EPI",
    price: 9.90,
    currentStock: 8,
    minStock: 20,
    supplier: "EPI Segurança"
  },
  {
    id: "6",
    name: "Martelo de Borracha",
    sku: "MB-01",
    category: "Ferramentas",
    price: 22.50,
    currentStock: 45,
    minStock: 15,
    supplier: "Ferragens Total"
  },
  {
    id: "7",
    name: "Cola de Silicone 280g",
    sku: "CS-280",
    category: "Adesivos",
    price: 18.90,
    currentStock: 25,
    minStock: 10,
    supplier: "Adesivos & Cia"
  }
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BackButton />
                <h1 className="text-3xl font-bold">Gerenciar Estoque</h1>
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/produtos/novo">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Novo Produto
                </Link>
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar produto por nome, SKU ou categoria..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Produto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque Atual</TableHead>
                    <TableHead>Estoque Mínimo</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.currentStock}</TableCell>
                      <TableCell>{product.minStock}</TableCell>
                      <TableCell>{product.supplier}</TableCell>
                      <TableCell>
                        {product.currentStock <= product.minStock ? (
                          <Badge variant="destructive">Estoque Baixo</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Estoque Normal
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

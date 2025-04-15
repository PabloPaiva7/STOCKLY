
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

// Mock data for suppliers
type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  products: number;
  status: "active" | "inactive";
  rating: number;
};

const suppliers: Supplier[] = [
  {
    id: "1",
    name: "Fixadores Ltda",
    contact: "Carlos Mendes",
    email: "contato@fixadoresltda.com.br",
    phone: "(11) 3456-7890",
    address: "Rua das Indústrias, 123 - São Paulo, SP",
    products: 15,
    status: "active",
    rating: 4.5
  },
  {
    id: "2",
    name: "Eletro Condutores",
    contact: "Mariana Silva",
    email: "mariana@eletrocondutores.com.br",
    phone: "(11) 2345-6789",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    products: 28,
    status: "active",
    rating: 4.2
  },
  {
    id: "3",
    name: "Tintas Colormax",
    contact: "Roberto Santos",
    email: "vendas@colormax.com.br",
    phone: "(11) 4567-8901",
    address: "Rua das Tintas, 500 - Guarulhos, SP",
    products: 12,
    status: "active",
    rating: 4.8
  },
  {
    id: "4",
    name: "Material Elétrico SA",
    contact: "Amanda Costa",
    email: "amanda@materialeletrico.com.br",
    phone: "(11) 5678-9012",
    address: "Av. dos Eletricistas, 200 - Osasco, SP",
    products: 30,
    status: "active",
    rating: 3.9
  },
  {
    id: "5",
    name: "EPI Segurança",
    contact: "Fernando Almeida",
    email: "fernando@episeguranca.com.br",
    phone: "(11) 6789-0123",
    address: "Rua da Segurança, 50 - Barueri, SP",
    products: 20,
    status: "inactive",
    rating: 4.0
  },
  {
    id: "6",
    name: "Ferragens Total",
    contact: "Roberta Pereira",
    email: "contato@ferragenstotal.com.br",
    phone: "(11) 7890-1234",
    address: "Av. das Ferragens, 300 - São Bernardo, SP",
    products: 45,
    status: "active",
    rating: 4.7
  },
  {
    id: "7",
    name: "Adesivos & Cia",
    contact: "Paulo Oliveira",
    email: "vendas@adesivosecia.com.br",
    phone: "(11) 8901-2345",
    address: "Rua dos Adesivos, 100 - Santo André, SP",
    products: 18,
    status: "inactive",
    rating: 3.5
  }
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to render stars based on rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fillOpacity="0.5" />
          </svg>
        )}
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <BackButton />
                <h1 className="text-3xl font-bold">Fornecedores</h1>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <PlusCircle className="mr-2 h-5 w-5" />
                Novo Fornecedor
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar fornecedor por nome, contato ou email..."
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
                    <TableHead>Nome do Fornecedor</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Produtos</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.products} produtos</TableCell>
                      <TableCell>{renderRating(supplier.rating)}</TableCell>
                      <TableCell>
                        {supplier.status === "active" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                            Inativo
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

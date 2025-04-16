import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { BackButton } from "@/components/BackButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

const supplierFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  contact: z.string().min(3, { message: "O nome do contato deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Digite um email válido" }),
  phone: z.string().min(10, { message: "Digite um telefone válido" }),
  address: z.string().min(5, { message: "O endereço deve ter pelo menos 5 caracteres" }),
  products: z.number().int().min(0),
  status: z.enum(["active", "inactive"]),
  rating: z.number().min(0).max(5)
});

type SupplierFormValues = z.infer<typeof supplierFormSchema>;

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

const initialSuppliers: Supplier[] = [
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
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const { toast } = useToast();
  
  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      products: 0,
      status: "active",
      rating: 0
    }
  });

  const handleNewSupplier = () => {
    form.reset({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      products: 0,
      status: "active",
      rating: 0
    });
    setCurrentSupplier(null);
    setIsDialogOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    form.reset({
      id: supplier.id,
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      products: supplier.products,
      status: supplier.status,
      rating: supplier.rating
    });
    setCurrentSupplier(supplier);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSupplier = () => {
    if (currentSupplier) {
      setSuppliers(suppliers.filter(s => s.id !== currentSupplier.id));
      toast({
        title: "Fornecedor excluído",
        description: `${currentSupplier.name} foi removido com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const onSubmit = (data: SupplierFormValues) => {
    if (!currentSupplier) {
      const newSupplier: Supplier = {
        id: Date.now().toString(),
        name: data.name,
        contact: data.contact,
        email: data.email,
        phone: data.phone,
        address: data.address,
        products: data.products,
        status: data.status,
        rating: data.rating
      };
      setSuppliers([...suppliers, newSupplier]);
      toast({
        title: "Fornecedor adicionado",
        description: `${data.name} foi adicionado com sucesso.`,
      });
    } 
    else {
      const updatedSuppliers = suppliers.map(s => 
        s.id === data.id ? {
          ...s,
          name: data.name,
          contact: data.contact,
          email: data.email,
          phone: data.phone,
          address: data.address,
          products: data.products,
          status: data.status,
          rating: data.rating
        } : s
      );
      setSuppliers(updatedSuppliers);
      toast({
        title: "Fornecedor atualizado",
        description: `${data.name} foi atualizado com sucesso.`,
      });
    }
    setIsDialogOpen(false);
  };

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
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleNewSupplier}>
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
                    <TableHead>Ações</TableHead>
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
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditSupplier(supplier)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteClick(supplier)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentSupplier ? "Editar Fornecedor" : "Novo Fornecedor"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Fornecedor</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Fixadores Ltda" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="nome@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 0000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Endereço completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade de Produtos</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avaliação (0-5)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.1" 
                          min="0" 
                          max="5"
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          <option value="active">Ativo</option>
                          <option value="inactive">Inativo</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {currentSupplier ? "Atualizar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o fornecedor{" "}
              <strong>{currentSupplier?.name}</strong> e todos os seus dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSupplier} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}

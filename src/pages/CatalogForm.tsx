
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Save, Trash2, CheckSquare } from "lucide-react";

// Define the form schema
const catalogSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
});

type CatalogFormValues = z.infer<typeof catalogSchema>;

export default function CatalogForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [catalogId, setCatalogId] = useState<string | undefined>(id);

  // Set up form with react-hook-form
  const form = useForm<CatalogFormValues>({
    resolver: zodResolver(catalogSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetch products
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        toast.error("Erro ao carregar produtos");
        throw error;
      }

      return data;
    },
  });

  // Fetch catalog data if editing
  const { isLoading } = useQuery({
    queryKey: ['catalog', id],
    queryFn: async () => {
      if (!id) return null;

      const { data: catalogData, error: catalogError } = await supabase
        .from('catalogs')
        .select('*')
        .eq('id', id)
        .single();

      if (catalogError) {
        toast.error("Erro ao carregar dados do catálogo");
        throw catalogError;
      }

      // Populate form with catalog data
      if (catalogData) {
        form.reset({
          name: catalogData.name,
          description: catalogData.description || "",
        });
      }

      // Fetch catalog items to know which products are selected
      const { data: catalogItems, error: itemsError } = await supabase
        .from('catalog_items')
        .select('product_id')
        .eq('catalog_id', id);

      if (itemsError) {
        toast.error("Erro ao carregar itens do catálogo");
        throw itemsError;
      }

      // Set selected products
      setSelectedProducts(catalogItems.map(item => item.product_id) as string[]);

      return catalogData;
    },
    enabled: isEditing,
  });

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prevState => {
      if (prevState.includes(productId)) {
        return prevState.filter(id => id !== productId);
      } else {
        return [...prevState, productId];
      }
    });
  };

  // Nova função para selecionar todos os produtos
  const selectAllProducts = () => {
    // Se todos os produtos já estão selecionados, desmarque todos
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
      toast.info("Todos os produtos foram desmarcados");
    } else {
      // Caso contrário, selecione todos
      const allProductIds = products.map(product => product.id);
      setSelectedProducts(allProductIds);
      toast.success("Todos os produtos foram selecionados");
    }
  };

  const onSubmit = async (data: CatalogFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        // Update existing catalog
        const { error } = await supabase
          .from('catalogs')
          .update({
            name: data.name,
            description: data.description,
          })
          .eq('id', id);

        if (error) throw error;
        
        // Delete existing catalog items
        const { error: deleteError } = await supabase
          .from('catalog_items')
          .delete()
          .eq('catalog_id', id);

        if (deleteError) throw deleteError;

      } else {
        // Insert new catalog
        const { data: newCatalog, error } = await supabase
          .from('catalogs')
          .insert({
            name: data.name,
            description: data.description,
          })
          .select()
          .single();

        if (error) throw error;
        
        // Set the ID for the newly created catalog
        if (newCatalog) {
          setCatalogId(newCatalog.id);
        } else {
          throw new Error("Erro ao criar catálogo");
        }
      }

      // Insert catalog items for selected products
      const currentCatalogId = isEditing ? id : catalogId;
      if (selectedProducts.length > 0 && currentCatalogId) {
        const catalogItems = selectedProducts.map(productId => ({
          catalog_id: currentCatalogId,
          product_id: productId
        }));

        const { error: insertError } = await supabase
          .from('catalog_items')
          .insert(catalogItems);

        if (insertError) throw insertError;
      }
      
      toast.success(isEditing ? "Catálogo atualizado com sucesso!" : "Catálogo criado com sucesso!");
      navigate('/catalogos');
    } catch (error) {
      console.error('Error saving catalog:', error);
      toast.error("Erro ao salvar catálogo");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && isEditing) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <p>Carregando dados do catálogo...</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const areAllProductsSelected = products.length > 0 && selectedProducts.length === products.length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-bold">
                {isEditing ? "Editar Catálogo" : "Novo Catálogo"}
              </h1>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Informações do Catálogo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Catálogo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea className="min-h-[100px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Produtos</CardTitle>
                    <Button 
                      type="button"
                      variant={areAllProductsSelected ? "default" : "outline"}
                      size="sm"
                      onClick={selectAllProducts}
                      className="flex items-center gap-2"
                    >
                      <CheckSquare className="h-4 w-4" />
                      {areAllProductsSelected ? "Desmarcar Todos" : "Selecionar Todos"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">Selecionar</TableHead>
                            <TableHead>Nome do Produto</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Estoque</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8">
                                Nenhum produto cadastrado
                              </TableCell>
                            </TableRow>
                          ) : (
                            products.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell>
                                  <Checkbox 
                                    checked={selectedProducts.includes(product.id)}
                                    onCheckedChange={() => handleProductToggle(product.id)}
                                  />
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-4">
                    {isEditing && id && (
                      <Button variant="destructive" type="button" onClick={() => {
                        if (confirm("Deseja realmente excluir este catálogo?")) {
                          supabase
                            .from('catalogs')
                            .delete()
                            .eq('id', id)
                            .then(({ error }) => {
                              if (error) {
                                toast.error("Erro ao excluir catálogo");
                              } else {
                                toast.success("Catálogo excluído com sucesso");
                                navigate('/catalogos');
                              }
                            });
                        }
                      }}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir Catálogo
                      </Button>
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Salvando..." : "Salvar Catálogo"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

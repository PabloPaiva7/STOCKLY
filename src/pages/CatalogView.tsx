
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Printer, FileText } from "lucide-react";

export default function CatalogView() {
  const { id } = useParams();
  const [signatureName, setSignatureName] = useState("");
  const [showSignatureForm, setShowSignatureForm] = useState(false);

  const { data: catalog, isLoading } = useQuery({
    queryKey: ['catalog-view', id],
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

      // Fetch catalog items with product details
      const { data: catalogItems, error: itemsError } = await supabase
        .from('catalog_items')
        .select(`
          id,
          product_id,
          products (
            id,
            name,
            sku,
            price,
            quantity,
            description
          )
        `)
        .eq('catalog_id', id);

      if (itemsError) {
        toast.error("Erro ao carregar itens do catálogo");
        throw itemsError;
      }

      return {
        ...catalogData,
        items: catalogItems
      };
    },
  });

  const handlePrint = () => {
    window.print();
  };

  if (isLoading || !catalog) {
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6 print:m-0 print:p-0 print:shadow-none">
            <div className="flex items-center justify-between print:hidden">
              <div className="flex items-center gap-4">
                <BackButton />
                <h1 className="text-3xl font-bold">Catálogo: {catalog.name}</h1>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  asChild
                >
                  <Link to={`/catalogos/${id}/editar`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md print:shadow-none print:m-0">
              <div className="print:visible">
                <h1 className="text-3xl font-bold mb-4">{catalog.name}</h1>
                {catalog.description && (
                  <p className="text-gray-600 mb-6">{catalog.description}</p>
                )}
              </div>

              {catalog.items?.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Este catálogo não possui produtos.</p>
                </div>
              ) : (
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Disponibilidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {catalog.items?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold">{item.products.name}</p>
                              {item.products.description && (
                                <p className="text-sm text-gray-500">{item.products.description}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{item.products.sku}</TableCell>
                          <TableCell>R$ {item.products.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {item.products.quantity > 0 ? (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Em estoque
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Indisponível
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-16 print:block border-t pt-8 print:pt-16">
                    <div className="flex flex-col gap-8 items-center">
                      {showSignatureForm ? (
                        <div className="w-full max-w-md">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="flex flex-col gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-1">
                                    Nome para assinatura
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={signatureName}
                                    onChange={(e) => setSignatureName(e.target.value)}
                                    placeholder="Digite seu nome completo"
                                  />
                                </div>
                                <Button
                                  onClick={() => {
                                    if (signatureName) {
                                      toast.success("Catálogo assinado com sucesso!");
                                      setShowSignatureForm(false);
                                    } else {
                                      toast.error("Por favor, informe seu nome para assinatura");
                                    }
                                  }}
                                >
                                  Assinar Catálogo
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <Button 
                          className="print:hidden"
                          onClick={() => setShowSignatureForm(true)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Assinar Catálogo
                        </Button>
                      )}
                      
                      <div className="print:block print:mt-8 border-t pt-4 w-80 text-center">
                        {signatureName ? (
                          <p className="font-medium">{signatureName}</p>
                        ) : (
                          <p className="text-sm text-gray-400">Assinatura do Cliente</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

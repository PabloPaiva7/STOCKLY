
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { BackButton } from "@/components/BackButton";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function Catalogs() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: catalogs = [], isLoading } = useQuery({
    queryKey: ['catalogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('catalogs')
        .select(`
          id,
          name,
          description,
          created_at,
          catalog_items (
            id,
            product_id
          )
        `);

      if (error) {
        toast.error("Erro ao carregar catálogos");
        throw error;
      }

      return data;
    },
  });

  // Filter catalogs based on search term
  const filteredCatalogs = catalogs.filter(catalog => 
    catalog.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (catalog.description && catalog.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
                <h1 className="text-3xl font-bold">Catálogos</h1>
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/catalogos/novo">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Novo Catálogo
                </Link>
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar catálogo por nome..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <p className="text-center py-8">Carregando catálogos...</p>
            ) : filteredCatalogs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-500 mb-6">Nenhum catálogo encontrado.</p>
                <Button asChild>
                  <Link to="/catalogos/novo">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Criar Novo Catálogo
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCatalogs.map((catalog) => (
                  <Card key={catalog.id} className="shadow-md">
                    <CardHeader>
                      <CardTitle>{catalog.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{catalog.description || "Sem descrição"}</p>
                      <p className="text-sm text-gray-500">
                        {catalog.catalog_items.length} produtos
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline" 
                        asChild
                      >
                        <Link to={`/catalogos/${catalog.id}/visualizar`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Visualizar
                        </Link>
                      </Button>
                      <Button 
                        asChild
                      >
                        <Link to={`/catalogos/${catalog.id}/editar`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

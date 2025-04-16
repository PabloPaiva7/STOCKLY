
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Save, Trash2 } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { BackButton } from "@/components/BackButton";

interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  costPrice: number;
  salePrice: number;
  notes: string;
  image?: File;
}

export default function ProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented with Supabase
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-2xl font-bold">
                {isEditing ? "Editar Produto" : "Novo Produto"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto</Label>
                    <Input id="name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">Código SKU</Label>
                    <Input id="sku" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Input id="category" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentStock">Quantidade Atual</Label>
                    <Input id="currentStock" type="number" min="0" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Estoque Mínimo</Label>
                    <Input id="minStock" type="number" min="0" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Preço de Custo</Label>
                    <Input id="costPrice" type="number" min="0" step="0.01" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Preço de Venda</Label>
                    <Input id="salePrice" type="number" min="0" step="0.01" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Imagem do Produto</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image")?.click()}
                        className="w-full"
                      >
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Escolher Imagem
                      </Button>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 rounded-md max-h-32 object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Anotações Adicionais</Label>
                <Textarea id="notes" className="min-h-[100px]" />
              </div>

              <div className="flex justify-end gap-4">
                {isEditing && (
                  <Button variant="destructive" type="button">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                )}
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

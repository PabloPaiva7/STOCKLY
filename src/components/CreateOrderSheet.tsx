
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

const orderSchema = z.object({
  requester: z.string().min(1, "Campo obrigatório"),
  notes: z.string(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface Product {
  name: string;
  quantity: number;
}

interface CreateOrderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateOrderSheet({ open, onOpenChange }: CreateOrderSheetProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      requester: "",
      notes: "",
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    // Implement order creation logic when connected to backend
    console.log("Form data:", { ...data, products });
    onOpenChange(false);
    form.reset();
    setProducts([]);
  };

  const addProduct = () => {
    if (productName && quantity > 0) {
      setProducts([...products, { name: productName, quantity }]);
      setProductName("");
      setQuantity(1);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Novo Pedido de Saída</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
            <FormField
              control={form.control}
              name="requester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solicitante</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do solicitante ou setor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h4 className="font-medium">Produtos</h4>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Produto</Label>
                  <Input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Nome do produto"
                  />
                </div>
                <div className="w-28">
                  <Label>Quantidade</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="button" variant="secondary" onClick={addProduct}>
                    Adicionar
                  </Button>
                </div>
              </div>

              {products.length > 0 && (
                <ul className="border rounded-md divide-y">
                  {products.map((product, index) => (
                    <li key={index} className="p-3">
                      {product.name} - {product.quantity} unidades
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Observações adicionais..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={products.length === 0}>
                Criar Pedido
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}


import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type LowStockProduct = {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  minStock: number;
  supplier: string;
  restockETA?: string;
};

export function LowStockList() {
  // In a real application, this data would come from an API
  const products: LowStockProduct[] = [
    {
      id: "1",
      name: "Parafuso Philips 4x40mm",
      sku: "PP-4x40",
      currentStock: 15,
      minStock: 50,
      supplier: "Fixadores Ltda",
      restockETA: "2025-04-22",
    },
    {
      id: "2",
      name: "Cabo Elétrico 2.5mm (metro)",
      sku: "CE-2.5",
      currentStock: 28,
      minStock: 100,
      supplier: "Eletro Condutores",
      restockETA: "2025-04-18",
    },
    {
      id: "3",
      name: "Tinta Acrílica Branca 18L",
      sku: "TA-BR-18L",
      currentStock: 3,
      minStock: 10,
      supplier: "Tintas Colormax",
    },
    {
      id: "4",
      name: "Fita Isolante Preta (rolo)",
      sku: "FI-PR",
      currentStock: 12,
      minStock: 30,
      supplier: "Material Elétrico SA",
      restockETA: "2025-04-25",
    },
    {
      id: "5",
      name: "Luva de Proteção G (par)",
      sku: "LP-G",
      currentStock: 8,
      minStock: 20,
      supplier: "EPI Segurança",
    },
  ];

  // Show skeleton while loading in a real app
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Produto</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Estoque Atual</TableHead>
            <TableHead>Estoque Mínimo</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Previsão de Reabastecimento</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.currentStock}</TableCell>
              <TableCell>{product.minStock}</TableCell>
              <TableCell>{product.supplier}</TableCell>
              <TableCell>
                {product.restockETA ? new Date(product.restockETA).toLocaleDateString('pt-BR') : "Não agendado"}
              </TableCell>
              <TableCell>
                {product.restockETA ? (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Pedido em Andamento
                  </Badge>
                ) : (
                  <Badge variant="destructive">Reposição Necessária</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

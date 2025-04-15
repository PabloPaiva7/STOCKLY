
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BadgeDollarSign, Receipt, CreditCard, Database } from "lucide-react";

const financialData = {
  contasReceber: [
    { cliente: "Cliente A", valor: 5000, vencimento: "2025-04-20" },
    { cliente: "Cliente B", valor: 3500, vencimento: "2025-04-25" },
    { cliente: "Cliente C", valor: 7800, vencimento: "2025-04-30" },
  ],
  contasPagar: [
    { fornecedor: "Fornecedor X", valor: 4200, vencimento: "2025-04-18" },
    { fornecedor: "Fornecedor Y", valor: 2800, vencimento: "2025-04-22" },
    { fornecedor: "Fornecedor Z", valor: 6500, vencimento: "2025-04-28" },
  ],
  fluxoCaixa: {
    saldoAtual: 45000,
    receitasPrevistas: 16300,
    despesasPrevistas: 13500,
    saldoPrevisto: 47800
  },
  inventario: {
    totalItens: 1234,
    valorTotal: 285000,
    ultimaContagem: "2025-04-10",
    diferencaContagem: -3
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export function FinancialOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Contas a Receber</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialData.contasReceber.map((conta) => (
                  <TableRow key={conta.cliente}>
                    <TableCell>{conta.cliente}</TableCell>
                    <TableCell>{formatCurrency(conta.valor)}</TableCell>
                    <TableCell>{formatDate(conta.vencimento)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Contas a Pagar</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vencimento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialData.contasPagar.map((conta) => (
                  <TableRow key={conta.fornecedor}>
                    <TableCell>{conta.fornecedor}</TableCell>
                    <TableCell>{formatCurrency(conta.valor)}</TableCell>
                    <TableCell>{formatDate(conta.vencimento)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Fluxo de Caixa</CardTitle>
          <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Atual</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(financialData.fluxoCaixa.saldoAtual)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saldo Previsto</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(financialData.fluxoCaixa.saldoPrevisto)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Receitas Previstas</p>
                <p className="text-lg text-green-600">
                  {formatCurrency(financialData.fluxoCaixa.receitasPrevistas)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Despesas Previstas</p>
                <p className="text-lg text-red-600">
                  {formatCurrency(financialData.fluxoCaixa.despesasPrevistas)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Inventário</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total de Itens</p>
                <p className="text-2xl font-bold">
                  {financialData.inventario.totalItens}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(financialData.inventario.valorTotal)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Última Contagem</p>
                <p className="text-lg">
                  {formatDate(financialData.inventario.ultimaContagem)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diferença na Contagem</p>
                <p className={`text-lg ${financialData.inventario.diferencaContagem < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {financialData.inventario.diferencaContagem}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

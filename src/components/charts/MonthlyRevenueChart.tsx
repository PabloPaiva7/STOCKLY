
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { mes: 'Jan', vendas: 45000 },
  { mes: 'Fev', vendas: 52000 },
  { mes: 'Mar', vendas: 48000 },
  { mes: 'Abr', vendas: 61000 },
  { mes: 'Mai', vendas: 55000 },
  { mes: 'Jun', vendas: 67000 },
  { mes: 'Jul', vendas: 72000 },
  { mes: 'Ago', vendas: 69000 },
  { mes: 'Set', vendas: 74000 },
  { mes: 'Out', vendas: 78000 },
  { mes: 'Nov', vendas: 82000 },
  { mes: 'Dez', vendas: 91000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export function MonthlyRevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(value) => `R$ ${value/1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line 
                type="monotone" 
                dataKey="vendas" 
                stroke="#9b87f5" 
                strokeWidth={2}
                name="Vendas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

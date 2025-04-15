
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: 'Monitor LG 24"', quantidade: 124 },
  { name: 'Teclado Mecânico', quantidade: 98 },
  { name: 'Mouse Wireless', quantidade: 86 },
  { name: 'Notebook Dell', quantidade: 72 },
  { name: 'Headset Gamer', quantidade: 65 },
];

export function TopProductsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Mais Vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} unidades`, "Vendas"]} />
              <Bar dataKey="quantidade" fill="#9b87f5" name="Quantidade Vendida" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

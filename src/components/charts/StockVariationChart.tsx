
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { mes: 'Jan', quantidade: 120 },
  { mes: 'Fev', quantidade: 150 },
  { mes: 'Mar', quantidade: 180 },
  { mes: 'Abr', quantidade: 170 },
  { mes: 'Mai', quantidade: 200 },
  { mes: 'Jun', quantidade: 220 },
];

export function StockVariationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variação de Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="quantidade" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

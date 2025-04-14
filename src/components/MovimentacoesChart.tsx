
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Seg", entradas: 40, saidas: 24 },
  { name: "Ter", entradas: 30, saidas: 13 },
  { name: "Qua", entradas: 20, saidas: 28 },
  { name: "Qui", entradas: 27, saidas: 18 },
  { name: "Sex", entradas: 18, saidas: 21 },
  { name: "Sab", entradas: 23, saidas: 17 },
  { name: "Dom", entradas: 34, saidas: 15 },
];

export function MovimentacoesChart() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Movimentações da Semana</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="entradas" fill="#9b87f5" name="Entradas" />
            <Bar dataKey="saidas" fill="#F97316" name="Saídas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

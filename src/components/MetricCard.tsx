
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <span className={cn(
                "text-sm",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {trend.isPositive ? "+" : "-"}{trend.value}%
              </span>
            )}
          </div>
        </div>
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
    </Card>
  );
}

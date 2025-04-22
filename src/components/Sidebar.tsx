
import { Home, Package, ShoppingCart, FileText, Users, AlertTriangle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Package, label: "Estoque", href: "/estoque" },
  { icon: AlertTriangle, label: "Baixo Estoque", href: "/estoque/baixo" },
  { icon: BookOpen, label: "Catálogos", href: "/catalogos" },
  { icon: ShoppingCart, label: "Pedidos", href: "/pedidos" },
  { icon: FileText, label: "Relatórios", href: "/relatorios" },
  { icon: Users, label: "Fornecedores", href: "/fornecedores" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <h2 className="text-lg font-semibold">Estoque Vivo</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild className="flex items-center gap-2 py-2">
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

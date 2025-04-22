
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductForm from "./pages/ProductForm";
import LowStock from "./pages/LowStock";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Catalogs from "./pages/Catalogs";
import CatalogForm from "./pages/CatalogForm";
import CatalogView from "./pages/CatalogView";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtos/novo" element={<ProductForm />} />
            <Route path="/produtos/:id/editar" element={<ProductForm />} />
            <Route path="/estoque" element={<Inventory />} />
            <Route path="/estoque/baixo" element={<LowStock />} />
            <Route path="/catalogos" element={<Catalogs />} />
            <Route path="/catalogos/novo" element={<CatalogForm />} />
            <Route path="/catalogos/:id/editar" element={<CatalogForm />} />
            <Route path="/catalogos/:id/visualizar" element={<CatalogView />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/fornecedores" element={<Suppliers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

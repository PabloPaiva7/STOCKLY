
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button variant="ghost" onClick={() => navigate(-1)} size="sm">
      <ArrowLeft className="mr-2 h-4 w-4" />
      Voltar
    </Button>
  );
}

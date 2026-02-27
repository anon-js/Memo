"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const CreateMemoButton = ({ onClick }: { onClick: () => void; }) => (
  <Button 
    onClick={onClick}
    variant="outline" 
    className="justify-start m-2 p-2 text-gray-500 hover:text-gray-900"
  >
    <Plus size={16} />
    <span className="font-bold">메모 추가</span>
  </Button>
);
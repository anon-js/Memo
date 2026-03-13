"use client";

import { FileText } from "lucide-react";
import { Memo } from "@/types";
import { Button } from "@/components/ui/Button";

interface MemoProps {
  memo: Memo;
  activeId: string | null;
}

export default function MemoItem({ memo, activeId }: MemoProps) {
  return (
    <Button
      href={`/${memo.id}`}
      icon={FileText}
      iconSize={16}
      className="text-md justify-start"
      variant={activeId === memo.id ? "outline" : "ghost" }
      fullWidth
    >
      {memo.title || "제목 없음"}
    </Button>
  );
}
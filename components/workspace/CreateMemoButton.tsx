"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createMemo } from "@/app/actions/memo";
import { Button } from "@/components/ui/Button";

export function CreateMemoButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleCreate = async () => {
    setIsPending(true);
    try {
      const result = await createMemo();
      if (result.success && result.memoId) {
        router.push(`/${result.memoId}`);
        router.refresh();
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button 
      variant="primary" 
      icon={Plus} 
      isLoading={isPending}
      onClick={handleCreate}
    >
      새 메모 작성하기
    </Button>
  );
}
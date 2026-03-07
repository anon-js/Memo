"use client";

import { useParams, useRouter } from "next/navigation";
import { User, Memo } from "@/types";
import Profile from "./components/Profile";
import MemoList from "./components/MemoList";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createMemo } from "@/app/actions/memo";
import { useSidebar } from "@/hooks/useSidebar";

interface SidebarProps {
  user: User;
  memos: Memo[];
}

export function Sidebar({ user, memos }: SidebarProps) {
  const router = useRouter();
  const params = useParams();
  const { isSidebarOpen } = useSidebar();
  const currentMemoId = params?.memoId as string;

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
    <aside 
      className={`
        bg-gray-50 border-r border-gray-200 h-screen transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "w-96" : "w-0"}
      `}
    >
      <div className={`${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"} transition-opacity duration-200`}>
        <Profile user={user} />
        <div className="flex-1 flex flex-col min-h-0 mt-4">
          <div className="flex items-center justify-between ps-4.5 pe-4">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">최근 메모</span>
            <Button
              icon={Plus}
              iconSize={24}
              onClick={handleCreate}
              isLoading={isPending}
              variant="ghost"
              className="p-1.5"
            />
          </div>
          <nav className="flex-1 overflow-y-auto" aria-label="메모 목록">
            <MemoList
              memos={memos}
              activeId={currentMemoId}
            />
          </nav>
        </div>
      </div>
    </aside>
  );
}
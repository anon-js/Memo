"use client";

import { createMemo } from "@/app/actions/memo";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import MemoItem from "./MemoItem";
import { CreateMemoButton } from "./CreateMemoButton";
import { UserProfileMenu } from "./UserProfile";
import { User } from "@/types/auth";
import { Memo } from "@/types/memo";

export function Sidebar({ user, memos }: { user: User; memos: Memo[] }) {
  const router = useRouter();
  const params = useParams();
  const currentMemoId = params?.memoId as string;
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const rootMemos = useMemo(() => 
    memos.filter((m) => !m.parentId), 
  [memos]);

  const handleCreate = async () => {
    try {
      const result = await createMemo();
      if (result.success && result.memoId) {
        router.push(`/${result.memoId}`);
        router.refresh();
      }
    } catch (error) {
      console.error("메모 생성 실패:", error);
    }
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 hidden md:flex flex-col h-screen relative z-20">
      <CreateMemoButton onClick={handleCreate} />

      <nav className="flex-1 overflow-y-auto p-2 custom-scrollbar">
        {rootMemos.length === 0 ? (
          <div className="flex flex-col items-center mt-20 opacity-40">
            <p className="text-sm font-medium text-gray-400">메모가 없습니다.</p>
          </div>
        ) : (
          rootMemos.map((memo) => (
            <MemoItem
              key={memo.id}
              memo={memo}
              allMemos={memos}
              depth={0}
              activeId={currentMemoId}
            />
          ))
        )}
      </nav>

      <UserProfileMenu 
        user={user} 
        isOpen={isProfileOpen} 
        setIsOpen={setIsProfileOpen} 
      />
    </aside>
  );
}
"use client";

import { useMemo } from "react";
import { Memo } from "@/types";
import MemoItem from "./MemoItem";

interface MemoListProps {
  memos: Memo[];
  activeId: string | null;
}

export default function MemoList({ memos, activeId }: MemoListProps) {
  const rootMemos = useMemo(() => 
    memos.filter((m) => !m.parentId),
    [memos]
  );

  if (rootMemos.length === 0) {
    return (
      <p className="text-xs text-gray-400 text-center mt-10">
        메모가 없습니다.
      </p>
    );
  }

  return (
    <div className="p-2 space-y-0.5">
      {rootMemos.map((memo) => (
        <MemoItem
          key={memo.id}
          memo={memo}
          allMemos={memos}
          depth={0}
          activeId={activeId}
        />
      ))}
    </div>
  );
}
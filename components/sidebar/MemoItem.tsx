"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Memo } from "@/types/memo";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface MemoItemProps {
  memo: Memo;
  allMemos: Memo[];
  depth: number;
  activeId?: string;
}

export default function MemoItem({ memo, allMemos, depth, activeId }: MemoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = activeId === memo.id;

  const childMemos = allMemos.filter((m) => m.parentId === memo.id);
  const hasChildren = childMemos.length > 0;

  const onExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <Link
        href={`/${memo.id}`}
        className={cn(
          "group flex items-center gap-1 py-1 px-2 rounded-md transition-colors text-sm",
          isActive ? "bg-blue-10/50 text-blue-700 hover:bg-blue-100 font-medium" : "text-gray-600 hover:bg-gray-200",
          depth > 0 && `ml-${depth * 3}` 
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <div className="w-4 h-4 flex items-center justify-center">
          {hasChildren && (
            <Button
              onClick={onExpand}
              className="p-0.5 hover:bg-gray-300 rounded transition"
            >
              {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </Button>
          )}
        </div>

        <FileText size={14} className={cn("shrink-0", isActive ? "text-blue-500" : "text-gray-400")} />
        
        <span className="truncate flex-1">
          {memo.title || "제목 없음"}
        </span>
      </Link>

      {isExpanded && hasChildren && (
        <div className="mt-0.5">
          {childMemos.map((child) => (
            <MemoItem
              key={child.id}
              memo={child}
              allMemos={allMemos}
              depth={depth + 1}
              activeId={activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
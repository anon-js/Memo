import { StickyNote } from "lucide-react";
import { CreateMemoButton } from "@/components/workspace/CreateMemoButton";

export default function WorkspacePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50/50">
      <div className="text-center space-y-6 animate-in fade-in duration-700">
        <div className="relative inline-block">
          <StickyNote size={64} className="text-blue-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            간편하고 간단한 메모
          </h1>
          <p className="text-gray-500 text-sm max-w-60 mx-auto leading-relaxed">
            새로운 아이디어나 잊지 말아야 할 메모를 <br />
            지금 바로 기록해 보세요.
          </p>
        </div>
        <CreateMemoButton />
      </div>
    </div>
  );
}
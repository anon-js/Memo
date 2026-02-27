"use client";
import { EllipsisVertical, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

export const UserProfileMenu = ({ user, isOpen, setIsOpen }: any) => (
  <div className="border-t border-gray-200 p-2 relative bg-gray-50">
    {isOpen && (
      <>
        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
        <div className="absolute bottom-full left-0 w-full mb-2 px-2 z-40">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden px-1 py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Link href="/settings" onClick={() => setIsOpen(false)} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition rounded-lg">
              <Settings size={16} />
              <span>프로필 설정</span>
            </Link>
            <hr className="my-1 border-gray-200" />
            <form action={logout}>
              <Button
                type="submit"
                label="로그아웃"
                variant="error-ghost"
              >
                <LogOut size={16} />
                <span>로그아웃</span>
              </Button>
            </form>
          </div>
        </div>
      </>
    )}
    <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-200 transition text-left group">
      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
        {user.username.slice(0, 1).toUpperCase()}
      </div>
      <span className="flex-1 text-lg font-medium text-gray-700 truncate group-hover:text-gray-900">
        {user.username}
      </span>
      <EllipsisVertical size={14} className="text-gray-400 group-hover:text-gray-600" />
    </button>
  </div>
);
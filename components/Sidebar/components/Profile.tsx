"use client";

import { LogOut, Settings, User2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { Dropdown } from "@/components/ui/Dropdown";
import { User } from "@/types";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function Profile({ user }: { user: User }) {
  const [isPending, setIsPending] = useState(false);
  
  const handleLogout = () => {
    setIsPending(true);
    signOut({ redirectTo: "/login" });
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2 text-left">
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
          {user.username[0].toUpperCase()}
        </div>
        <span className="flex-1 text-lg font-medium text-gray-700 truncate">
          {user.username}
        </span>
      </div>
      <Dropdown className="relative">
        <Dropdown.Trigger>
          <Button
            variant="ghost"
            icon={Settings}
            iconSize={20}
            className="p-2"
          />
        </Dropdown.Trigger>
        <Dropdown.List side="bottom" align="end">
          <Dropdown.Item icon={User2} href="/profile">
            프로필 설정
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item icon={LogOut} variant="danger" onClick={handleLogout}>
            로그아웃
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
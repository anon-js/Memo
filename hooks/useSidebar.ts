"use client";

import { useContext, useCallback } from "react";
import { SidebarContext } from "@/context/SidebarContext";

export function useSidebar() {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  const { isSidebarOpen, setIsSidebarOpen } = context;

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar_open", String(next));
      return next;
    });
  }, [setIsSidebarOpen]);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
    localStorage.setItem("sidebar_open", "true");
  }, [setIsSidebarOpen]);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    localStorage.setItem("sidebar_open", "false");
  }, [setIsSidebarOpen]);

  return { isSidebarOpen, toggleSidebar, openSidebar, closeSidebar };
}
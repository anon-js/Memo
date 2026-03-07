"use client";

import React, { createContext, useState, useEffect } from "react";

interface SidebarContextProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar_open");
    if (saved !== null) setIsOpen(saved === "true");

    const handleResize = () => {
      if (window.innerWidth < 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen: isOpen, setIsSidebarOpen: setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
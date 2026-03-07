"use client";

import React, { forwardRef } from "react";
import { useDropdown } from "..";

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export const List = forwardRef<HTMLDivElement, ListProps>(
  ({ children, side = "bottom", align = "start", className = "", ...props }, ref) => {
    const { isOpen, setIsOpen } = useDropdown();

    if (!isOpen) return null;

    const sideClasses = {
      top: "bottom-full mb-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2 top-0",
      right: "left-full ml-2 top-0",
    };

    const alignClasses = {
      start: side === "top" || side === "bottom" ? "left-0" : "top-0",
      center: side === "top" || side === "bottom" ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2",
      end: side === "top" || side === "bottom" ? "right-0" : "bottom-0",
    };

    return (
      <div 
        ref={ref}
        onClick={() => setIsOpen(false)}
        className={`
          absolute z-50 min-w-40 bg-white border border-gray-200 
          rounded-xl shadow-xl p-1 animate-in fade-in zoom-in-95 duration-200
          ${sideClasses[side]} 
          ${alignClasses[align]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

List.displayName = "Dropdown.List";
"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  href?: string;
  variant?: "default" | "danger";
}

export const Item = forwardRef<HTMLButtonElement | HTMLAnchorElement, ItemProps>(
  ({ children, icon: Icon, onClick, href, variant = "default", className = "", ...props }, ref) => {
    const variants = {
      default: "text-gray-700 hover:bg-gray-100",
      danger: "text-red-600 hover:bg-red-50",
    };

    const commonClasses = cn(
      "w-full flex items-center gap-2 px-3 py-2 text-sm transition rounded-lg text-left",
      variants[variant],
      className
    );

    const content = (
      <>
        {Icon && <Icon size={16} />}
        <div className="flex-1">{children}</div>
      </>
    );

    if (href) {
      return (
        <Link 
          href={href} 
          className={commonClasses} 
          onClick={(e: any) => onClick?.(e)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button 
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button" 
        onClick={onClick} 
        className={commonClasses} 
        {...props}
      >
        {content}
      </button>
    );
  }
);

Item.displayName = "Dropdown.Item";
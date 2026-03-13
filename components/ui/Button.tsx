"use client";

import { cn } from "@/lib/utils";
import { Loader2, LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  isLoading?: boolean;
  icon?: LucideIcon;
  iconSize?: number;
  href?: string;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    variant = "primary",
    isLoading,
    icon: Icon,
    iconSize = 20,
    children,
    href,
    fullWidth = false,
    className = "",
    ...props
  }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap";
    
    const variants = {
      primary: "bg-black text-white hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-300 transition-all",
      secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-50 disabled:text-gray-400 transition-all",
      danger: "text-red-600 hover:bg-red-50 active:bg-red-100 disabled:text-red-300 transition-colors",
      ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 disabled:text-gray-300 transition-all",
      outline: "shadow-[0_0_0_1px_rgba(0,0,0,0.1)] text-gray-700 hover:bg-gray-50 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.2)] active:bg-gray-100 disabled:opacity-50 transition-all duration-200"
    };

    const combinedClassName = cn(
      baseStyles, 
      variants[variant], 
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2 size={iconSize} className="animate-spin" />
        ) : (
          Icon && <Icon size={iconSize} />
        )}
        {children && <span>{children}</span>}
      </>
    );

    if (href && !props.disabled) {
      return (
        <Link 
          href={href} 
          className={combinedClassName}
          {...(props as any)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        disabled={isLoading || props.disabled}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, ButtonVariant, ButtonSize } from "@/types/ui";

export const Button = ({
  label,
  isPending,
  loadingLabel,
  variant = "primary",
  size = "md",
  fullWidth = true,
  className,
  children,
  ...props
}: ButtonProps) => {
  
  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100",
    success: "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300",
    error: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
    "error-ghost": "bg-transparent text-red-600 hover:bg-red-50 disabled:bg-transparent",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 disabled:bg-transparent",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2 shrink-0", 
  };

  return (
    <button
      {...props}
      disabled={isPending || props.disabled}
      className={cn(
        "flex items-center gap-2 rounded-md transition font-medium disabled:cursor-not-allowed",
        fullWidth ? "w-full" : "w-fit",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {isPending ? (
        <>
          <span className="animate-spin">◌</span>
          {loadingLabel || label || children}
        </>
      ) : (
        children || label
      )}
    </button>
  );
};
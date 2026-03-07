"use client";

import React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Separator({ className = "", ...props }: SeparatorProps) {
  return (
    <div 
      className={`mx-2.5 my-1 border-t border-gray-200 ${className}`} 
      {...props} 
    />
  );
}
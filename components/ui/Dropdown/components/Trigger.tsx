"use client";

import React, { forwardRef } from "react";
import { useDropdown } from "..";

interface TriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Trigger = forwardRef<HTMLDivElement, TriggerProps>(
  ({ children, className = "", ...props }, ref) => {
    const { isOpen, setIsOpen } = useDropdown();

    return (
      <div 
        ref={ref}
        onClick={() => setIsOpen(!isOpen)} 
        className={`cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Trigger.displayName = "Dropdown.Trigger";
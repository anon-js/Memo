import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

// --- Button Types ---
export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "error" 
  | "error-ghost" 
  | "success" 
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isPending?: boolean;
  loadingLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children?: ReactNode;
}

// --- Input Types ---
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}
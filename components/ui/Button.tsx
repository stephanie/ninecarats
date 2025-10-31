"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  pending?: boolean;
  className?: string;
  loadingComponent?: ReactNode;
  isDark?: boolean;
}

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  pending = false,
  className = "",
  loadingComponent,
  isDark = true,
}: ButtonProps) {
  return (
    <button
      className={`w-full text-sm uppercase tracking-wide py-4 px-6 gap-2 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 ${className} ${isDark ? "bg-primary-dark text-white" : "bg-white text-black border border-primary-dark"}`}
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? loadingComponent || "Loading..." : children}
    </button>
  );
}

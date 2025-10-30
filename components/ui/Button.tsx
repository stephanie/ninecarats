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
      className={`w-full text-sm tracking-wide py-4 px-6 flex items-center justify-center uppercase cursor-pointer hover:opacity-95 min-h-14 ${className} ${isDark ? "bg-primary-dark text-white" : "bg-white text-black border border-primary-dark"}`}
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? loadingComponent || "Loading..." : children}
    </button>
  );
}

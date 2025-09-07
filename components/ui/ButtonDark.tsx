"use client";

import { ReactNode } from "react";

interface ButtonDarkProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  pending?: boolean;
  className?: string;
  loadingComponent?: ReactNode;
}

export function ButtonDark({
  children,
  onClick,
  type = "button",
  disabled = false,
  pending = false,
  className = "",
  loadingComponent,
}: ButtonDarkProps) {
  return (
    <button
      className={`w-full bg-primary-dark text-white text-sm tracking-wide py-4 px-6 flex items-center justify-center uppercase cursor-pointer hover:opacity-95 min-h-14 ${className}`}
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending ? loadingComponent || "Loading..." : children}
    </button>
  );
}

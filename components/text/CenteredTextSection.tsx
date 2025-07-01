import React from "react";

interface CenteredTextSectionProps {
  tagline: string;
  button: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function CenteredTextSection({
  tagline,
  button,
  children,
  className,
}: CenteredTextSectionProps) {
  return (
    <div
      className={`max-w-2xl mx-auto flex flex-col items-center text-center px-4 ${className}`}
    >
      <div className="text-white text-xs uppercase tracking-widest mb-4">
        {tagline}
      </div>
      <h2 className="text-white text-2xl md:text-4xl mb-4">{children}</h2>
      {button}
    </div>
  );
}

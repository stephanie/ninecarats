import React from "react";

interface TextHeaderFullProps {
  tagline: string;
  button?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}

export default function TextHeaderFull({
  tagline,
  button,
  children,
  className = "",
  align = "center",
}: TextHeaderFullProps) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <div
      className={`max-w-2xl mx-auto flex flex-col ${alignment} px-4 ${className}`}
    >
      <div className="text-white text-xs uppercase tracking-widest mb-4">
        {tagline}
      </div>
      <h2 className="text-white text-2xl md:text-4xl mb-4">{children}</h2>
      {button}
    </div>
  );
}

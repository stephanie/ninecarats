import { AnimatedText } from "components/animations";
import React from "react";

interface TextHeaderFullProps {
  tagline?: string;
  description?: string;
  button?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "center" | "left";
}

export default function TextHeaderFull({
  tagline,
  description,
  button,
  children,
  className = "",
  headerClassName = "",
  align = "center",
}: TextHeaderFullProps) {
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <div
      className={`max-w-2xl mx-auto flex flex-col ${alignment} px-4 ${className}`}
    >
      <div className="text-[0.625rem] uppercase tracking-widest mb-2 md:mb-4 font-body hidden md:flex">
        <AnimatedText direction="up" staggerDelay={100}>
          {tagline}
        </AnimatedText>
      </div>
      <h2
        className={`${headerClassName ? headerClassName : "text-2xl md:text-4xl"} mb-1 md:mb-2 font-header`}
      >
        <AnimatedText direction="up" staggerDelay={150}>
          {children}
        </AnimatedText>
      </h2>
      {description && (
        <div className="text-sm text-neutral-700 hidden md:flex p-4 w-[30rem]">
          <AnimatedText direction="up" staggerDelay={200}>
            {description}
          </AnimatedText>
        </div>
      )}
      {button}
    </div>
  );
}

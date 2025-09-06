"use client";

import { useScrollAnimation } from "hooks/useScrollAnimation";
import { ReactNode, useEffect, useState } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  triggerOnce?: boolean;
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  staggerDelay = 100,
  direction = "up",
  duration = 800,
  triggerOnce = true,
}: AnimatedTextProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    delay,
    triggerOnce,
  });

  const [animatedLines, setAnimatedLines] = useState<boolean[]>([]);

  // Split text into lines for animation
  const textContent = typeof children === "string" ? children : "";
  const lines = textContent.split("\n").filter((line) => line.trim() !== "");

  useEffect(() => {
    if (isVisible && lines.length > 0) {
      // Animate each line with stagger
      lines.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedLines((prev) => {
            const newLines = [...prev];
            newLines[index] = true;
            return newLines;
          });
        }, index * staggerDelay);
      });
    }
  }, [isVisible, lines.length, staggerDelay]);

  // Get transform direction
  const getTransform = (isAnimated: boolean) => {
    if (!isAnimated) {
      switch (direction) {
        case "up":
          return "translateY(30px)";
        case "down":
          return "translateY(-30px)";
        case "left":
          return "translateX(30px)";
        case "right":
          return "translateX(-30px)";
        default:
          return "translateY(30px)";
      }
    }
    return "translateY(0) translateX(0)";
  };

  // If children is not a string, render as single animated element
  if (typeof children !== "string") {
    return (
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={className}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: getTransform(isVisible),
          transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        }}
      >
        {children}
      </div>
    );
  }

  // Render line-by-line animation for text
  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          style={{
            opacity: animatedLines[index] ? 1 : 0,
            transform: getTransform(animatedLines[index] || false),
            transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
            overflow: "hidden",
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

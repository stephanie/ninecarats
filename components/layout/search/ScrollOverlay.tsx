"use client";

import { useEffect, useState } from "react";

interface ScrollOverlayProps {
  onFilterSortClick: () => void;
}

export default function ScrollOverlay({
  onFilterSortClick,
}: ScrollOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerThreshold = 300; // Distance from footer to start hiding

      // Show overlay when scrolled down more than 200px, but hide when near footer
      const shouldShow =
        scrollY > 200 &&
        scrollY + windowHeight < documentHeight - footerThreshold;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-18 left-1/2 z-10 mx-auto flex min-w-max items-center justify-center gap-15 bg-black px-4 transition-all duration-500 ease-in-out md:bottom-15 md:mx-0 md:w-fit ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{
        transform: isVisible ? "translate(-50%, 0)" : "translate(-50%, 200%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onFilterSortClick}
            className="text-sm text-gray-200 hover:text-white transition-colors duration-500 cursor-pointer"
          >
            Filter & Sort
          </button>
        </div>
      </div>
    </div>
  );
}

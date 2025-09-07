"use client";

import { useState } from "react";

interface FloatingHelpButtonProps {
  onClick: () => void;
  isDialogOpen: boolean;
}

export function FloatingHelpButton({
  onClick,
  isDialogOpen,
}: FloatingHelpButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Hover expanded state - only show when dialog is closed */}
      {/* {!isDialogOpen && (
        <div
          className={`absolute bottom-0 right-0 transition-all duration-300 ease-out ${
            isHovered
              ? "opacity-100 scale-100 translate-x-0"
              : "opacity-0 scale-95 translate-x-2 pointer-events-none"
          }`}
        >
          <div className="bg-white border border-black rounded-lg px-4 py-2 shadow-lg">
            <span className="text-black font-medium text-sm">Questions?</span>
          </div>
        </div>
      )} */}

      {/* Main help button / Close button */}
      <button
        onClick={onClick}
        onMouseEnter={() => !isDialogOpen && setIsHovered(true)}
        onMouseLeave={() => !isDialogOpen && setIsHovered(false)}
        className={`group bg-primary-dark text-white relative border border-black rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 cursor-pointer`}
        aria-label={isDialogOpen ? "Close help dialog" : "Open help dialog"}
      >
        {isDialogOpen ? (
          // Close icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Help icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 11 23"
            fill="none"
          >
            <path
              d="M0.599609 5.6C0.599609 -0.7 10.4996 -0.7 10.4996 5.6C10.4996 10.1 5.99961 9.2 5.99961 14.6M5.99961 21.818L6.01761 21.7982"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

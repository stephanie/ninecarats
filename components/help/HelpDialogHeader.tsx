"use client";

interface HelpDialogHeaderProps {
  onClose: () => void;
  isMobile?: boolean;
}

export function HelpDialogHeader({
  onClose,
  isMobile = false,
}: HelpDialogHeaderProps) {
  return (
    <div className="bg-primary-dark text-white p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors cursor-pointer"
        aria-label="Close dialog"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M0.666992 13.3332L7.00033 6.99984L13.3337 13.3332M13.3337 0.666504L6.99912 6.99984L0.666992 0.666504"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="pr-8">
        <h1 className="text-sm font-header font-light mb-2 uppercase">
          Nine Carats
        </h1>
        <div className={isMobile ? "mt-12" : "mt-6 xl:mt-12"}>
          <h2
            className={`tracking-wide font-header font-light mb-1 ${
              isMobile ? "text-2xl" : "text-xl xl:text-2xl"
            }`}
          >
            Hello
          </h2>
          <p
            className={`tracking-wide text-gray-300 font-header ${
              isMobile ? "text-2xl" : "text-xl xl:text-2xl"
            }`}
          >
            How can we help?
          </p>
        </div>
      </div>
    </div>
  );
}

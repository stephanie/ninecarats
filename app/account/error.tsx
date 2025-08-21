"use client";

import { useEffect } from "react";

export default function AccountError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Account page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-serif text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We encountered an error while loading your account information. Please
          try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full py-3 px-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-none"
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none"
          >
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
}

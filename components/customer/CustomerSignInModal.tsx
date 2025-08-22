"use client";

import { useState } from "react";
import CustomerSignInForm from "./CustomerSignInForm";

interface CustomerSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerSignInModal({
  isOpen,
  onClose,
}: CustomerSignInModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full h-full md:h-auto md:max-w-md mx-0 md:mx-4 p-4 md:p-6 rounded-none">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">
            {isLogin ? "Sign in" : "Create account"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <CustomerSignInForm
          onSuccess={onClose}
          onClose={onClose}
          onFormStateChange={setIsLogin}
        />
      </div>
    </div>
  );
}

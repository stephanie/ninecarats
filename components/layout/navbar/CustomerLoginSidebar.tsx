"use client";

import { useCustomer } from "components/customer/CustomerContext";
import CustomerSignInForm from "components/customer/CustomerSignInForm";
import { Sidebar } from "components/ui/Sidebar";
import { useState } from "react";

interface CustomerLoginSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerLoginSidebar({
  isOpen,
  onClose,
}: CustomerLoginSidebarProps) {
  const { customer, logout } = useCustomer();
  const [isLogin, setIsLogin] = useState(true);

  // If user is logged in, show user profile
  if (customer) {
    return (
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        title="Account"
        position="right"
        width="w-[500px]"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl text-gray-600">
                {customer.firstName
                  ? customer.firstName.charAt(0).toUpperCase()
                  : customer.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              {customer.firstName
                ? `${customer.firstName} ${customer.lastName || ""}`
                : customer.email}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{customer.email}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                window.location.href = "/account";
              }}
              className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none"
            >
              Your profile
            </button>
            <button
              onClick={() => {
                window.location.href = "/account?tab=orders";
              }}
              className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none"
            >
              Your orders
            </button>
            <button
              onClick={() => {
                window.location.href = "/account?tab=addresses";
              }}
              className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none"
            >
              Your addresses
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="w-full py-3 px-4 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 rounded-none"
            >
              Sign out
            </button>
          </div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isLogin ? "Sign in" : "Create account"}
      position="right"
      width="w-[500px]"
    >
      {/* Customer sign in component */}
      <CustomerSignInForm
        onSuccess={() => {
          onClose();
          // Redirect to account page
          window.location.href = "/account";
        }}
        onClose={onClose}
        onFormStateChange={setIsLogin}
      />
    </Sidebar>
  );
}

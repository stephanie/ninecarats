"use client";

import {
  AccountOverview,
  AddressBookTab,
  ContactUsTab,
  OrdersTab,
} from "components/account";
import { useCustomer } from "components/customer/CustomerContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { customer, logout, isLoading } = useCustomer();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    // Only redirect if not loading and no customer
    if (!isLoading && !customer) {
      router.push("/");
    }
  }, [customer, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!customer) {
    return null;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "overview") {
      router.push("/account");
    } else {
      router.push(`/account?tab=${tab}`);
    }
  };

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;
      case "addresses":
        return <AddressBookTab />;
      case "contact":
        return <ContactUsTab />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="bg-white mt-32 pb-16 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              {/* User Info */}
              <div className="mb-8">
                <h1 className="text-2xl text-gray-900 mb-2">
                  {customer.firstName} {customer.lastName}
                </h1>
                <p className="text-sm text-gray-600 mb-3">{customer.email}</p>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
                >
                  Sign out
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => handleTabChange("overview")}
                    className={`w-full text-left py-2 px-0 text-sm transition-colors cursor-pointer ${
                      activeTab === "overview"
                        ? "text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Account overview
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => handleTabChange("orders")}
                    className={`w-full text-left py-2 px-0 text-sm transition-colors cursor-pointer ${
                      activeTab === "orders"
                        ? "text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Your orders
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => handleTabChange("addresses")}
                    className={`w-full text-left py-2 px-0 text-sm transition-colors cursor-pointer ${
                      activeTab === "addresses"
                        ? "text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Your addresses
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => handleTabChange("contact")}
                    className={`w-full text-left py-2 px-0 text-sm transition-colors cursor-pointer ${
                      activeTab === "contact"
                        ? "text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Contact us
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

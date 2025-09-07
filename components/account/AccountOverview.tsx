"use client";

import { useCustomer } from "components/customer/CustomerContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountOverview() {
  const { customer, orders, addresses, refreshOrders, refreshAddresses } =
    useCustomer();
  const router = useRouter();

  useEffect(() => {
    refreshOrders();
    refreshAddresses();
  }, [refreshOrders, refreshAddresses]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-2xl text-gray-900 font-header">Account overview</h2>
        <button
          onClick={() => router.push("/account?tab=orders")}
          className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
        >
          View all orders
        </button>
      </div>

      {/* Orders Section */}
      <div className="space-y-4">
        <h3 className="text-xl text-gray-900 font-header">Orders</h3>
        {orders.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 text-sm">You have no orders</p>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600">
              You have {orders.length} order{orders.length !== 1 ? "s" : ""}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Latest order: {orders[0]?.name}
            </p>
          </div>
        )}
      </div>

      {/* Addresses Section */}
      <div className="space-y-4">
        <h3 className="text-xl text-gray-900 font-header">Addresses</h3>
        <p className="text-gray-600 text-sm">
          Manage your addresses and choose your default address.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/account?tab=addresses")}
            className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
          >
            View addresses
          </button>
          <span className="text-sm text-gray-500">
            ({addresses.length} address{addresses.length !== 1 ? "es" : ""})
          </span>
        </div>
      </div>
    </div>
  );
}

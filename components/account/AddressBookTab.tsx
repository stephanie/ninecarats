"use client";

import { useCustomer } from "components/customer/CustomerContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddressBookTab() {
  const { customer, addresses, refreshAddresses } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    refreshAddresses();
  }, [refreshAddresses]);

  const formatAddress = (address: any) => {
    const parts = [
      address.firstName && address.lastName
        ? `${address.firstName} ${address.lastName}`
        : null,
      address.company,
      address.address1,
      address.address2,
      address.city && address.province
        ? `${address.city}, ${address.province}`
        : address.city || address.province,
      address.zip,
      address.country,
    ].filter(Boolean);

    return parts.join(", ");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between text-left">
        <h2 className="text-2xl text-gray-900">Your addresses</h2>
        <button className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors">
          Add New Address
        </button>
      </div>

      {/* Addresses Content */}
      {addresses.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600 text-lg">You have no addresses</p>
          <button className="mt-4 text-sm text-gray-600 underline hover:text-gray-900 transition-colors">
            Add your first address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address, key) => (
            <div key={key} className="border border-gray-200 p-4 rounded-lg">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">
                  {address.firstName} {address.lastName}
                </p>
                {address.company && (
                  <p className="text-gray-600">{address.company}</p>
                )}
                <p className="text-gray-600">{formatAddress(address)}</p>
                {address.phone && (
                  <p className="text-gray-600">Phone: {address.phone}</p>
                )}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <button className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors">
                  Update Address
                </button>
                <button className="text-sm text-red-600 underline hover:text-red-700 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Account overview */}
      <div className="text-center pt-6">
        <button
          onClick={() => router.push("/account")}
          className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
        >
          Back to Account overview
        </button>
      </div>
    </div>
  );
}

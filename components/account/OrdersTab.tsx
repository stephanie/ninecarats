"use client";

import { useCustomer } from "components/customer/CustomerContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrdersTab() {
  const { customer, orders, refreshOrders } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <h2 className="text-2xl text-gray-900">Your orders</h2>
      </div>

      {/* Orders Content */}
      {orders.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-600 text-sm">You have no orders</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Order {order.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(order.processedAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    {formatPrice(
                      String(order.totalPrice.amount),
                      order.totalPrice.currencyCode
                    )}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.fulfillmentStatus === "FULFILLED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.financialStatus === "PAID"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.financialStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                {order.lineItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 py-3 border-t border-gray-100"
                  >
                    {item.variant.image && (
                      <img
                        src={item.variant.image.url}
                        alt={item.variant.image.altText || item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatPrice(
                          item.variant.price.amount,
                          item.variant.price.currencyCode
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Account overview */}
      <div className="text-left pt-6">
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

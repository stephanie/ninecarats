"use client";

import LoadingDots from "components/loading-dots";
import Price from "components/price";
import Sidebar from "components/ui/Sidebar";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useCustomer } from "../customer/CustomerContext";
import { useSignInModal } from "../layout/SignInModalProvider";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

// Global cart sidebar state manager
class CartSidebarManager {
  private static instance: CartSidebarManager;
  private isOpen: boolean = false;
  private subscribers: Set<(isOpen: boolean) => void> = new Set();

  static getInstance(): CartSidebarManager {
    if (!CartSidebarManager.instance) {
      CartSidebarManager.instance = new CartSidebarManager();
    }
    return CartSidebarManager.instance;
  }

  subscribe(callback: (isOpen: boolean) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  setOpen(open: boolean): void {
    this.isOpen = open;
    this.subscribers.forEach((callback) => callback(this.isOpen));
  }

  getIsOpen(): boolean {
    return this.isOpen;
  }
}

export const cartManager = CartSidebarManager.getInstance();

export default function CartSidebar({ textColor }: { textColor: string }) {
  const { cart } = useCart();
  const { customer, logout } = useCustomer();
  const { openSignInModal } = useSignInModal();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);

  // Subscribe to global cart state
  useEffect(() => {
    const unsubscribe = cartManager.subscribe((globalIsOpen) => {
      setIsOpen(globalIsOpen);
    });
    return unsubscribe;
  }, []);

  const openCart = useCallback(() => {
    cartManager.setOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    cartManager.setOpen(false);
  }, []);

  const handleCheckout = useCallback(async () => {
    // Prepare customer information for checkout prefilling
    const customerInfo: any = {};

    if (customer?.email) {
      customerInfo.email = customer.email;
    }

    // Get default address if available
    if (customer?.defaultAddress) {
      const defaultAddress = customer.defaultAddress;
      if (defaultAddress) {
        customerInfo.address = {
          firstName: defaultAddress.firstName,
          lastName: defaultAddress.lastName,
          address1: defaultAddress.address1,
          address2: defaultAddress.address2,
          city: defaultAddress.city,
          province: defaultAddress.province,
          country: defaultAddress.country,
          zip: defaultAddress.zip,
          phone: defaultAddress.phone,
        };
      }
    }

    await redirectToCheckout(
      Object.keys(customerInfo).length > 0 ? customerInfo : undefined
    );
  }, [customer]);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!cartManager.getIsOpen()) {
        cartManager.setOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [cart?.totalQuantity, quantityRef]);

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        onClose={closeCart}
        title="Shopping bag"
        zIndex={50}
        position="right"
        width="w-[500px]"
      >
        {!cart || cart.lines.length === 0 ? (
          <div className="flex w-full flex-col overflow-hidden">
            <p className="mt-2 text-sm">Your bag is empty.</p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="grow overflow-auto">
              {cart.lines
                .sort((a, b) =>
                  a.merchandise.product.title.localeCompare(
                    b.merchandise.product.title
                  )
                )
                .map((item, i) => {
                  const merchandiseSearchParams = {} as MerchandiseSearchParams;

                  item.merchandise.selectedOptions.forEach(
                    ({ name, value }) => {
                      if (value !== DEFAULT_OPTION) {
                        merchandiseSearchParams[name.toLowerCase()] = value;
                      }
                    }
                  );

                  const merchandiseUrl = createUrl(
                    `/product/${item.merchandise.product.handle}`,
                    new URLSearchParams(merchandiseSearchParams)
                  );

                  return (
                    <li key={i} className="flex w-full flex-col">
                      <div className="relative flex w-full flex-row justify-between px-1 py-4">
                        <div className="absolute z-40 -ml-1 -mt-2">
                          <DeleteItemButton item={item} />
                        </div>
                        <div className="flex flex-row">
                          <div className="relative h-20 w-16 overflow-hidden bg-neutral-300">
                            <Image
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                              alt={
                                item.merchandise.product.featuredImage
                                  .altText || item.merchandise.product.title
                              }
                              src={item.merchandise.product.featuredImage.url}
                            />
                          </div>
                          <Link
                            href={merchandiseUrl}
                            onClick={closeCart}
                            className="z-30 ml-4 flex flex-row space-x-5"
                          >
                            <div className="flex flex-1 flex-col text-base">
                              <span className="leading-tight font-header text-lg mb-2">
                                {item.merchandise.product.title}
                              </span>
                              {item.merchandise.title !== DEFAULT_OPTION ? (
                                <p className="text-xs text-neutral-500">
                                  {item.merchandise.title}
                                </p>
                              ) : null}
                              <Price
                                className="flex flex-3 space-y-2 text-left text-xs mt-4"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={
                                  item.cost.totalAmount.currencyCode
                                }
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="flex flex-col justify-end">
                          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="w-6 text-center">
                              <span className="w-full text-xs">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>

            {/* Customer Info */}
            {customer?.email ? (
              <div className="py-3 text-sm flex flex-col gap-2">
                <div>
                  Signed in as{" "}
                  <Link
                    onClick={closeCart}
                    href="/account"
                    className="text-neutral-600 hover:text-black transition-colors duration-200"
                  >
                    <span className="font-medium underline">
                      {customer.email}
                    </span>
                  </Link>
                </div>
                <div>
                  Not you?{" "}
                  <button
                    className="text-neutral-600 hover:text-black transition-colors duration-200 underline font-medium cursor-pointer"
                    onClick={async () => {
                      await logout();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-3 text-sm">
                Have an account?{" "}
                <button
                  onClick={openSignInModal}
                  className="text-neutral-600 hover:text-black transition-colors duration-200 underline font-medium cursor-pointer"
                >
                  Sign in or create account
                </button>
              </div>
            )}

            {/* Checkout Summary */}
            <div className="py-4 text-sm text-neutral-500 border-t border-neutral-200">
              <div className="mb-3 flex items-center justify-between">
                <p>Taxes</p>
                <Price
                  className="text-right text-base text-black"
                  amount={cart.cost.totalTaxAmount.amount}
                  currencyCode={cart.cost.totalTaxAmount.currencyCode}
                />
              </div>
              <div className="mb-2 flex items-center justify-between">
                <p>Shipping</p>
                <p className="text-right text-sm">Calculated at checkout</p>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <p>Total</p>
                <Price
                  className="text-right text-base text-black"
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </div>
            </div>
            <form action={handleCheckout}>
              <CheckoutButton />
            </form>
          </div>
        )}
      </Sidebar>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-black text-white text-sm tracking-wide py-4 px-6 flex items-center justify-center uppercase cursor-pointer opacity-90 hover:opacity-100 min-h-14"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : "Checkout"}
    </button>
  );
}

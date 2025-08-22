"use client";

import LoadingDots from "components/loading-dots";
import Price from "components/price";
import Sidebar from "components/ui/Sidebar";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useCustomer } from "../customer/CustomerContext";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ textColor }: { textColor: string }) {
  const { cart, updateCartItem } = useCart();
  const { customer } = useCustomer();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

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
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart} className="flex">
        <OpenCart quantity={cart?.totalQuantity} textColor={textColor} />
      </button>

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
                          <DeleteItemButton
                            item={item}
                            optimisticUpdate={updateCartItem}
                          />
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
                            className="z-30 ml-4 flex flex-row space-x-4"
                          >
                            <div className="flex flex-1 flex-col text-base">
                              <span className="leading-tight">
                                {item.merchandise.product.title}
                              </span>
                              {item.merchandise.title !== DEFAULT_OPTION ? (
                                <p className="text-sm text-neutral-500">
                                  {item.merchandise.title}
                                </p>
                              ) : null}
                              <Price
                                className="flex flex-3 space-y-2 text-left text-sm mt-4"
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
                            <EditItemQuantityButton
                              item={item}
                              type="minus"
                              optimisticUpdate={updateCartItem}
                            />
                            <p className="w-6 text-center">
                              <span className="w-full text-sm">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton
                              item={item}
                              type="plus"
                              optimisticUpdate={updateCartItem}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
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
            <form
              action={async () => {
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
                  Object.keys(customerInfo).length > 0
                    ? customerInfo
                    : undefined
                );
              }}
            >
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

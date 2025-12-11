"use client";

import { useCart } from "components/cart/cart-context";
import { cartManager } from "components/cart/cart-sidebar";
import OpenCart from "components/cart/open-cart";

export default function CartIcon({ textColor }: { textColor: string }) {
  const { cart } = useCart();

  return (
    <button
      aria-label="Open cart"
      onClick={() => cartManager.setOpen(true)}
      className="flex"
    >
      <OpenCart quantity={cart?.totalQuantity} textColor={textColor} />
    </button>
  );
}


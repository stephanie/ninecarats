"use client";

import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { useProduct } from "components/product/product-context";
import { Product, ProductVariant } from "lib/shopify/types";
import { useState, useTransition } from "react";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  isPending,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  isPending: boolean;
}) {
  const buttonClasses =
    "w-full bg-black text-white text-base tracking-wide py-4 px-6 gap-2 flex items-center justify-center uppercase cursor-pointer opacity-90";
  const disabledClasses = "bg-black/60 cursor-not-allowed";
  const svg = (
    <svg
      className="w-4 h-4"
      strokeWidth="2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
    >
      <path
        d="M19.2609 9.69589L20.6455 18.6959C20.8319 19.9074 19.8945 21 18.6688 21H5.33122C4.10545 21 3.16809 19.9074 3.35448 18.6959L4.73909 9.69589C4.8892 8.72022 5.7287 8 6.71584 8H17.2842C18.2713 8 19.1108 8.72022 19.2609 9.69589Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out of stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        {svg}
        Add To Bag
      </button>
    );
  }

  return (
    <button
      type="submit"
      disabled={isPending}
      aria-label="Add To Bag"
      className={clsx(buttonClasses, {
        "hover:bg-black/80": !isPending,
        "bg-black/60": isPending,
      })}
    >
      {svg}
      {isPending ? "Adding..." : "Add To Bag"}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { state } = useProduct();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVariantId) {
      setMessage("Please select an option");
      return;
    }

    startTransition(async () => {
      try {
        const result = await addItem(null, selectedVariantId);
        setMessage(result || "Item added to cart");
      } catch (error) {
        setMessage("Error adding item to cart");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        isPending={isPending}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

"use client";

import Price from "components/price";
import { Product } from "lib/shopify/types";
import { useProduct } from "./product-context";

interface ProductPriceProps {
  product: Product;
  className?: string;
}

export function ProductPrice({ product, className }: ProductPriceProps) {
  const { state } = useProduct();

  // Find the selected variant based on current state
  const selectedVariant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );

  // Use selected variant price or fall back to min variant price
  const displayPrice =
    selectedVariant?.price || product.priceRange.minVariantPrice;
  const displayCurrencyCode =
    selectedVariant?.price?.currencyCode ||
    product.priceRange.minVariantPrice.currencyCode;

  return (
    <Price
      amount={displayPrice.amount}
      currencyCode={displayCurrencyCode}
      className={className}
    />
  );
}

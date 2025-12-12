"use client";

import { useProduct } from "components/product/product-context";
import { ProductOption } from "lib/shopify/types";
import { useState } from "react";
import { SizeGuideSidebar } from "./SizeGuideSidebar";

export function useSizeGuide(options: ProductOption[]) {
  const { state } = useProduct();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Check for supported size guide types
  const hasBraceletSizeGuide = options.some(
    (option) => option.name.toLowerCase() === "bracelet size"
  );
  const hasRingSizeGuide = options.some(
    (option) => option.name.toLowerCase() === "ring size"
  );
  const showSizeGuide = hasBraceletSizeGuide || hasRingSizeGuide;
  const sizeType = hasRingSizeGuide
    ? "ring"
    : hasBraceletSizeGuide
      ? "bracelet"
      : undefined;

  const selectedSize =
    sizeType === "bracelet"
      ? (state["bracelet size"] as string)
      : (state["ring size"] as string);

  const SizeGuideComponent = showSizeGuide ? (
    <SizeGuideSidebar
      isOpen={isSizeGuideOpen}
      onClose={() => setIsSizeGuideOpen(false)}
      selectedSize={selectedSize}
      sizeType={sizeType}
    />
  ) : null;

  return {
    showSizeGuide,
    sizeType,
    isSizeGuideOpen,
    openSizeGuide: () => setIsSizeGuideOpen(true),
    closeSizeGuide: () => setIsSizeGuideOpen(false),
    SizeGuideComponent,
  };
}


"use client";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { SortFilterItem, defaultSort } from "lib/constants";
import { Product } from "lib/shopify/types";
import { useMemo } from "react";

interface SortedProductGridProps {
  products: Product[];
  currentSort?: SortFilterItem;
}

export default function SortedProductGrid({
  products: initialProducts,
  currentSort = defaultSort,
}: SortedProductGridProps) {
  // Sort products client-side based on currentSort
  const sortedProducts = useMemo(() => {
    const products = [...initialProducts];

    switch (currentSort.sortKey) {
      case "PRICE":
        return products.sort((a, b) => {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
          return currentSort.reverse ? priceB - priceA : priceA - priceB;
        });
      case "CREATED_AT":
        return products.sort((a, b) => {
          const dateA = new Date(a.updatedAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();
          return currentSort.reverse ? dateB - dateA : dateA - dateB;
        });
      case "BEST_SELLING":
        // For best selling, we'll keep the original order (Shopify's default)
        return products;
      case "RELEVANCE":
      default:
        // Keep original order for relevance
        return products;
    }
  }, [initialProducts, currentSort]);

  if (sortedProducts.length === 0) {
    return (
      <p className="py-3 text-md">{`No products found in this collection`}</p>
    );
  }

  return (
    <Grid className="grid grid-cols-1 md:grid-cols-3 w-full transition-all duration-500 ease-in-out opacity-100 scale-100">
      <ProductGridItems products={sortedProducts} />
    </Grid>
  );
}

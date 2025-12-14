"use client";

import { SortFilterItem, defaultSort } from "lib/constants";
import { Product } from "lib/shopify/types";
import { useEffect, useState } from "react";
import FilterSortSidebar from "./FilterSortSidebar";
import ScrollOverlay from "./ScrollOverlay";
import SortedProductGrid from "./SortedProductGrid";

interface FilterSortWrapperProps {
  children: React.ReactNode;
  products: Product[];
  searchValue: string;
  resultsText: string;
  collections?: any[]; // Add collections prop
  currentCollectionHandle?: string;
  currentCollectionTitle?: string;
}

export default function FilterSortWrapper({
  children,
  products: initialProducts,
  searchValue,
  resultsText,
  collections = [], // Default to empty array
  currentCollectionHandle,
  currentCollectionTitle,
}: FilterSortWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<SortFilterItem>(defaultSort);

  const handleFilterSortClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Add click event listener to the filter-sort button
  useEffect(() => {
    const button = document.getElementById("filter-sort-button");
    if (button) {
      button.addEventListener("click", handleFilterSortClick);
      return () => button.removeEventListener("click", handleFilterSortClick);
    }
  }, []);

  const handleSortChange = (sortItem: SortFilterItem) => {
    setCurrentSort(sortItem);
    handleCloseSidebar();
  };

  return (
    <>
      {children}

      {/* Render sorted products */}
      <SortedProductGrid products={initialProducts} currentSort={currentSort} />

      {/* Filter & Sort Sidebar */}
      <FilterSortSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        collections={collections}
        currentCollectionHandle={currentCollectionHandle}
        currentCollectionTitle={currentCollectionTitle}
        currentSort={currentSort}
        onSortChange={handleSortChange}
      />

      {/* Scroll Overlay */}
      <ScrollOverlay onFilterSortClick={handleFilterSortClick} />
    </>
  );
}

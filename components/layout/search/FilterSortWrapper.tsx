"use client";

import { useEffect, useState } from "react";
import FilterSortSidebar from "./FilterSortSidebar";
import ScrollOverlay from "./ScrollOverlay";

interface FilterSortWrapperProps {
  children: React.ReactNode;
  products: any[];
  searchValue: string;
  resultsText: string;
  collections?: any[]; // Add collections prop
}

export default function FilterSortWrapper({
  children,
  products,
  searchValue,
  resultsText,
  collections = [], // Default to empty array
}: FilterSortWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <>
      {children}

      {/* Filter & Sort Sidebar */}
      <FilterSortSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        collections={collections}
      />

      {/* Scroll Overlay */}
      <ScrollOverlay onFilterSortClick={handleFilterSortClick} />
    </>
  );
}

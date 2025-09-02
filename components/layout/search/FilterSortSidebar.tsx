"use client";

import Sidebar from "components/ui/Sidebar";
import { sorting } from "lib/constants";
import FilterList from "./filter";

interface FilterSortSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collections?: any[];
}

export default function FilterSortSidebar({
  isOpen,
  onClose,
  collections = [],
}: FilterSortSidebarProps) {
  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Filter & Sort"
      zIndex={50}
      position="right"
      width="w-[400px]"
    >
      <div className="space-y-8">
        {/* Sort Options */}
        <div>
          <h3 className="text-lg font-header text-gray-900 mb-4">Sort by</h3>
          <FilterList list={sorting} title="" />
        </div>

        {/* Filter Options - Placeholder for future filters */}
        <div>
          <h3 className="text-lg font-header text-gray-900 mb-4">Category</h3>
          <div className="space-y-4">
            {collections.length > 0 ? (
              <FilterList list={collections} title="" />
            ) : (
              <div className="text-sm text-gray-500">
                No categories available
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

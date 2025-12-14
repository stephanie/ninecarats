"use client";

import { Sidebar } from "components/ui/Sidebar";
import { SortFilterItem, sorting } from "lib/constants";
import { Collection } from "lib/shopify/types";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import FilterList, { PathFilterItem } from "./filter";

interface FilterSortSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collections?: Collection[];
  currentCollectionHandle?: string;
  currentCollectionTitle?: string;
  currentSort?: SortFilterItem;
  onSortChange?: (sort: SortFilterItem) => void;
}

function CategoryFilterItem({
  item,
  isAllOption,
  collectionHandle,
  onClose,
}: {
  item: PathFilterItem;
  isAllOption: boolean;
  collectionHandle?: string;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSubCollection = searchParams.get("subCollection");

  // "All [collection]" is active when there's no subCollection param
  // Sub-collections are active when their handle matches the subCollection param
  const isActive = isAllOption
    ? !currentSubCollection && pathname === item.path.split("?")[0]
    : currentSubCollection === collectionHandle &&
      pathname === item.path.split("?")[0];

  // Parse item.path to get base pathname and its query params
  const pathParts = item.path.split("?");
  const basePath = pathParts[0] || item.path;
  const itemQueryString = pathParts[1];
  const itemParams = itemQueryString
    ? new URLSearchParams(itemQueryString)
    : new URLSearchParams();

  // Start with current search params, but remove q and subCollection
  // (we'll use subCollection from item.path if it exists)
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.delete("q");
  newParams.delete("subCollection");

  // Merge params from item.path (this includes the correct subCollection)
  itemParams.forEach((value, key) => {
    newParams.set(key, value);
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClose();
    // If already active, prevent navigation
    if (isActive) {
      e.preventDefault();
    }
  };

  return (
    <li className="mt-2 flex text-black">
      <Link
        href={createUrl(basePath, newParams)}
        onClick={handleClick}
        className={`w-full text-sm underline-offset-4 hover:underline ${
          isActive ? "underline underline-offset-4 cursor-default" : ""
        }`}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FilterSortSidebar({
  isOpen,
  onClose,
  collections = [],
  currentCollectionHandle,
  currentCollectionTitle,
  currentSort,
  onSortChange,
}: FilterSortSidebarProps) {
  // Convert collections to PathFilterItem format and add "All [collection]" option
  const categoryList: PathFilterItem[] = [];

  // Add "All [collection]" option at the top if we have a current collection
  if (currentCollectionHandle && currentCollectionTitle) {
    categoryList.push({
      title: `All ${currentCollectionTitle}`,
      path: `/search/${currentCollectionHandle}`,
    });
  }

  // Add sub-collections with subCollection query parameter
  collections.forEach((collection) => {
    if (currentCollectionHandle) {
      categoryList.push({
        title: collection.title,
        path: `/search/${currentCollectionHandle}?subCollection=${collection.handle}`,
      });
    }
  });

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Filter & Sort"
      position="right"
      width="w-[400px]"
    >
      <div className="space-y-8">
        {/* Sort Options */}
        <div>
          <h3 className="text-lg font-header text-gray-900 mb-4">Sort by</h3>
          <FilterList
            list={sorting}
            title=""
            onClose={onClose}
            currentSort={currentSort}
            onSortChange={onSortChange}
          />
        </div>

        {/* Filter Options - Category filters */}
        <div>
          <h3 className="text-lg font-header text-gray-900 mb-4">Category</h3>
          <div className="space-y-4">
            {categoryList.length > 0 ? (
              <ul>
                {categoryList.map((item, index) => (
                  <CategoryFilterItem
                    key={item.title}
                    item={item}
                    isAllOption={index === 0 && !!currentCollectionHandle}
                    collectionHandle={
                      index > 0 ? collections[index - 1]?.handle : undefined
                    }
                    onClose={onClose}
                  />
                ))}
              </ul>
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

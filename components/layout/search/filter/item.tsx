"use client";

import clsx from "clsx";
import type { SortFilterItem } from "lib/constants";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import type { ListItem, PathFilterItem } from ".";

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  newParams.delete("q");

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          "w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100",
          {
            "underline underline-offset-4": active,
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({
  item,
  onClose,
  currentSort,
  onSortChange,
}: {
  item: SortFilterItem;
  onClose?: () => void;
  currentSort?: SortFilterItem;
  onSortChange?: (sort: SortFilterItem) => void;
}) {
  const active =
    currentSort?.slug === item.slug || (!currentSort?.slug && !item.slug);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSortChange) {
      onSortChange(item);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <li
      className="mt-2 flex text-sm text-black dark:text-white"
      key={item.title}
    >
      <button
        onClick={handleClick}
        className={clsx(
          "w-full text-left hover:underline hover:underline-offset-4",
          {
            "underline underline-offset-4 cursor-default": active,
          }
        )}
      >
        {item.title}
      </button>
    </li>
  );
}

export function FilterItem({
  item,
  onClose,
  currentSort,
  onSortChange,
}: {
  item: ListItem;
  onClose?: () => void;
  currentSort?: SortFilterItem;
  onSortChange?: (sort: SortFilterItem) => void;
}) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem
      item={item}
      onClose={onClose}
      currentSort={currentSort}
      onSortChange={onSortChange}
    />
  );
}

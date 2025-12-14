import { SortFilterItem } from "lib/constants";
import { Suspense } from "react";
import { FilterItem } from "./item";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({
  list,
  onClose,
  currentSort,
  onSortChange,
}: {
  list: ListItem[];
  onClose?: () => void;
  currentSort?: SortFilterItem;
  onSortChange?: (sort: SortFilterItem) => void;
}) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem
          key={i}
          item={item}
          onClose={onClose}
          currentSort={currentSort}
          onSortChange={onSortChange}
        />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
  onClose,
  currentSort,
  onSortChange,
}: {
  list: ListItem[];
  title?: string;
  onClose?: () => void;
  currentSort?: SortFilterItem;
  onSortChange?: (sort: SortFilterItem) => void;
}) {
  return (
    <>
      <nav>
        {title ? (
          <h3 className="hidden text-xs text-neutral-500 md:block">{title}</h3>
        ) : null}
        <ul>
          <Suspense fallback={null}>
            <FilterItemList
              list={list}
              onClose={onClose}
              currentSort={currentSort}
              onSortChange={onSortChange}
            />
          </Suspense>
        </ul>
        {/* <ul className="md:hidden">
          <Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul> */}
      </nav>
    </>
  );
}

"use client";

import clsx from "clsx";
import { variantLinkConfig } from "lib/variant-links";
import Link from "next/link";

export function CrossProductVariantSelector({ handle }: { handle: string }) {
  const groups = variantLinkConfig[handle];
  if (!groups || groups.length === 0) return null;

  return (
    <>
      {groups.map((group) => (
        <div
          key={group.label}
          className="mb-4 flex flex-row gap-3 items-center"
        >
          <span className="text-sm tracking-wide">{group.label}:</span>
          <div className="flex flex-wrap gap-3">
            {group.options.map((option) => {
              const isActive = option.handle === handle;
              return isActive ? (
                <span
                  key={option.label}
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm cursor-default ring-1 ring-black"
                >
                  {option.label}
                </span>
              ) : (
                <Link
                  key={option.label}
                  href={`/product/${option.handle}`}
                  className={clsx(
                    "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm",
                    "ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-neutral-600"
                  )}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { variantLinkConfig } from "lib/variant-links";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MobileCrossProductVariantSelector({
  handle,
}: {
  handle: string;
}) {
  const groups = variantLinkConfig[handle];
  const [openSheet, setOpenSheet] = useState<string | null>(null);
  const router = useRouter();

  if (!groups || groups.length === 0) return null;

  const handleSelect = (targetHandle: string) => {
    setOpenSheet(null);
    if (targetHandle !== handle) {
      router.push(`/product/${targetHandle}`);
    }
  };

  return (
    <div className="flex flex-col w-full border-b border-neutral-200">
      {groups.map((group) => {
        const activeOption = group.options.find((o) => o.handle === handle);
        return (
          <div key={group.label} className="w-full">
            <button
              className={clsx(
                "w-full text-left px-4 py-4 border-t border-neutral-200 text-sm tracking-wide flex justify-between",
                "bg-white active:bg-neutral-100",
              )}
              onClick={() => setOpenSheet(group.label)}
            >
              <span className="text-neutral-500">
                Select {group.label.toLowerCase()}
              </span>
              <span className="text-black">{activeOption?.label || "-"}</span>
            </button>
            <Transition
              show={openSheet === group.label}
              as={Dialog}
              onClose={() => setOpenSheet(null)}
            >
              <div className="fixed inset-0 z-50 flex items-end justify-center">
                <TransitionChild
                  as="div"
                  enter="transition-opacity duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className="fixed inset-0 bg-black/30"
                    aria-hidden="true"
                    onClick={() => setOpenSheet(null)}
                  />
                </TransitionChild>
                <TransitionChild
                  as="div"
                  className="w-full"
                  enter="transition-transform duration-300"
                  enterFrom="translate-y-full"
                  enterTo="translate-y-0"
                  leave="transition-transform duration-200"
                  leaveFrom="translate-y-0"
                  leaveTo="translate-y-full"
                >
                  <DialogPanel className="w-full mx-auto bg-white shadow-xl p-6 pb-6 relative max-h-[85vh] flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-6 flex-shrink-0">
                      <div className="flex gap-4 w-full">
                        <button className="text-base pt-1 mr-4">
                          {`Select ${group.label.toLowerCase()}`}
                        </button>
                      </div>
                      <button
                        className="absolute right-6 top-6 text-xl"
                        onClick={() => setOpenSheet(null)}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto -mx-6 px-6">
                      <ul className="divide-y divide-neutral-200 border border-neutral-200">
                        {group.options.map((option) => {
                          const isActive = option.handle === handle;
                          return (
                            <li key={option.label}>
                              <button
                                type="button"
                                onClick={() => handleSelect(option.handle)}
                                className={clsx(
                                  "w-full flex justify-between items-center p-4 text-sm text-black",
                                  isActive
                                    ? "font-semibold bg-neutral-100"
                                    : "font-normal",
                                )}
                              >
                                <span>{option.label}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Transition>
          </div>
        );
      })}
    </div>
  );
}

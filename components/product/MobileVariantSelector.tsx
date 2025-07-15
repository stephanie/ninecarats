"use client";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useState } from "react";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function MobileVariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  if (
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1)
  ) {
    return null;
  }

  // Build combinations for availability
  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (acc, option) => ({ ...acc, [option.name.toLowerCase()]: option.value }),
      {}
    ),
  }));

  return (
    <div className="flex flex-col w-full">
      {options.map((option) => {
        const optionNameLowerCase = option.name.toLowerCase();
        const selectedValue = state[optionNameLowerCase];
        return (
          <div key={option.id} className="w-full">
            <button
              className={clsx(
                "w-full text-left px-4 py-4 border-t border-neutral-200 text-sm tracking-wide flex justify-between",
                "bg-white active:bg-neutral-100"
              )}
              onClick={() => setOpenSheet(option.name)}
            >
              Select {option.name}
              <span className="font-semibold">{selectedValue || "-"}</span>
            </button>
            <Transition
              show={openSheet === option.name}
              as={Dialog}
              onClose={() => setOpenSheet(null)}
            >
              <div className="fixed inset-0 z-50 flex items-end justify-center">
                <Transition.Child
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
                </Transition.Child>
                <Transition.Child
                  as="div"
                  className="w-full"
                  enter="transition-transform duration-300"
                  enterFrom="translate-y-full"
                  enterTo="translate-y-0"
                  leave="transition-transform duration-200"
                  leaveFrom="translate-y-0"
                  leaveTo="translate-y-full"
                >
                  <Dialog.Panel className="w-full mx-auto bg-white shadow-xl p-6 pb-12 relative">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-4 w-full">
                        <button
                          className={clsx("text-sm pt-1 mr-4")}
                        >{`Select ${option.name}`}</button>
                      </div>
                      <button
                        className="absolute right-6 top-6 text-xl"
                        onClick={() => setOpenSheet(null)}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                    </div>
                    <ul className="divide-y divide-neutral-200 border border-neutral-200">
                      {option.values.map((value) => {
                        // Check if this value is available for sale
                        const optionParams = {
                          ...state,
                          [optionNameLowerCase]: value,
                        };
                        const filtered = Object.entries(optionParams).filter(
                          ([key, value]) =>
                            options.find(
                              (option) =>
                                option.name.toLowerCase() === key &&
                                option.values.includes(value)
                            )
                        );
                        const isAvailableForSale = combinations.find(
                          (combination: Combination) =>
                            filtered.every(
                              ([key, value]) =>
                                combination[key] === value &&
                                combination.availableForSale
                            )
                        );
                        const isActive = selectedValue === value;
                        return (
                          <li key={value}>
                            <button
                              className={clsx(
                                "w-full flex justify-between items-center p-4 text-sm",
                                isActive
                                  ? "font-bold bg-neutral-100"
                                  : "font-normal",
                                isAvailableForSale
                                  ? "text-black"
                                  : "text-neutral-400 cursor-not-allowed"
                              )}
                              disabled={!isAvailableForSale}
                              aria-disabled={!isAvailableForSale}
                              onClick={() => {
                                if (!isAvailableForSale) return;
                                const newState = updateOption(
                                  optionNameLowerCase,
                                  value
                                );
                                updateURL(newState);
                                setOpenSheet(null);
                              }}
                            >
                              <span>{value}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Transition>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import clsx from "clsx";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useState } from "react";
import { useSizeGuide } from "./useSizeGuide";

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
  const { showSizeGuide, openSizeGuide, SizeGuideComponent } =
    useSizeGuide(options);

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
    <div className="flex flex-col w-full border-b border-neutral-200">
      {options.map((option) => {
        const optionNameLowerCase = option.name.toLowerCase();
        const selectedValue = state[optionNameLowerCase];
        const isSizeGuideOption =
          optionNameLowerCase === "ring size" ||
          optionNameLowerCase === "bracelet size";
        return (
          <div key={option.id} className="w-full">
            <button
              className={clsx(
                "w-full text-left px-4 py-4 border-t border-neutral-200 text-sm tracking-wide flex justify-between",
                "bg-white active:bg-neutral-100"
              )}
              onClick={() => setOpenSheet(option.name)}
            >
              Select {option.name.toLowerCase()}
              <span className="font-semibold">{selectedValue || "-"}</span>
            </button>
            <Transition
              show={openSheet === option.name}
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
                  <DialogPanel className="w-full mx-auto bg-white shadow-xl p-6 pb-6 relative">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-4 w-full">
                        <button
                          className={clsx("text-base pt-1 mr-4")}
                        >{`Select ${option.name.toLowerCase()}`}</button>
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
                            <form
                              action={() => {
                                if (!isAvailableForSale) return;
                                const newState = updateOption(
                                  optionNameLowerCase,
                                  value
                                );
                                updateURL(newState);
                                setOpenSheet(null);
                              }}
                            >
                              <button
                                type="submit"
                                className={clsx(
                                  "w-full flex justify-between items-center p-4 text-sm",
                                  isActive
                                    ? "font-semibold bg-neutral-100"
                                    : "font-normal",
                                  isAvailableForSale
                                    ? "text-black"
                                    : "text-neutral-400 cursor-not-allowed"
                                )}
                                disabled={!isAvailableForSale}
                                aria-disabled={!isAvailableForSale}
                              >
                                <span>{value}</span>
                              </button>
                            </form>
                          </li>
                        );
                      })}
                    </ul>
                    {isSizeGuideOption && showSizeGuide && (
                      <button
                        type="button"
                        onClick={openSizeGuide}
                        className="pt-4 text-sm underline text-neutral-600 hover:text-neutral-900"
                      >
                        Size guide
                      </button>
                    )}
                  </DialogPanel>
                </TransitionChild>
              </div>
            </Transition>
          </div>
        );
      })}
      {SizeGuideComponent}
    </div>
  );
}

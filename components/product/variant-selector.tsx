"use client";

import clsx from "clsx";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useState } from "react";
import { SizeGuideSidebar } from "./SizeGuideSidebar";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  // Check if any option is "Size" with Small or Medium values
  const hasSizeGuide = options.some(
    (option) =>
      option.name.toLowerCase() === "size" &&
      (option.values.includes("Small") || option.values.includes("Medium"))
  );

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

  return (
    <>
      {options.map((option) => {
        const isSizeOption =
          option.name.toLowerCase() === "size" && hasSizeGuide;

        return (
          <form key={option.id}>
            <div className="mb-4 flex flex-row gap-3 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm tracking-wide">{option.name}:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {option.values.map((value) => {
                  const optionNameLowerCase = option.name.toLowerCase();

                  // Base option params on current selectedOptions so we can preserve any other param state.
                  const optionParams = {
                    ...state,
                    [optionNameLowerCase]: value,
                  };

                  // Filter out invalid options and check if the option combination is available for sale.
                  const filtered = Object.entries(optionParams).filter(
                    ([key, value]) =>
                      options.find(
                        (option) =>
                          option.name.toLowerCase() === key &&
                          option.values.includes(value)
                      )
                  );
                  const isAvailableForSale = combinations.find((combination) =>
                    filtered.every(
                      ([key, value]) =>
                        combination[key] === value &&
                        combination.availableForSale
                    )
                  );

                  // The option is active if it's in the selected options.
                  const isActive = state[optionNameLowerCase] === value;

                  return (
                    <button
                      formAction={() => {
                        const newState = updateOption(
                          optionNameLowerCase,
                          value
                        );
                        updateURL(newState);
                      }}
                      key={value}
                      aria-disabled={!isAvailableForSale}
                      disabled={!isAvailableForSale}
                      title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                      className={clsx(
                        "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm",
                        {
                          "cursor-default ring-1 ring-black": isActive,
                          "ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-neutral-600":
                            !isActive && isAvailableForSale,
                          "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform":
                            !isAvailableForSale,
                        }
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
              {isSizeOption && (
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-sm underline text-neutral-600 hover:text-neutral-900"
                >
                  Size Guide
                </button>
              )}
            </div>
          </form>
        );
      })}

      {hasSizeGuide && (
        <SizeGuideSidebar
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
          selectedSize={state.size as string}
        />
      )}
    </>
  );
}

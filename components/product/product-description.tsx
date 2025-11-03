"use client";

import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { useMemo, useState } from "react";
import { AddToCart } from "../cart/add-to-cart";
import { useProduct } from "./product-context";
import { VariantSelector } from "./variant-selector";

type MenuSection = {
  title: string;
  description: string;
  isHtml: boolean;
};

export function ProductDescription({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(null);
  const { state } = useProduct();

  // Parse the descriptionHtml to extract "Item details" section
  const { mainDescription, itemDetailsHtml } = useMemo(() => {
    if (!product.descriptionHtml)
      return { mainDescription: null, itemDetailsHtml: null };

    // Look for start and end markers
    const startMarkerRegex = /###\s*Start:\s*Item details\s*###/i;
    const endMarkerRegex = /###\s*End:\s*Item details\s*###/i;

    const startMatch = product.descriptionHtml.match(startMarkerRegex);
    const endMatch = product.descriptionHtml.match(endMarkerRegex);

    // If both markers are found, extract the content between them
    if (
      startMatch &&
      endMatch &&
      startMatch.index !== undefined &&
      endMatch.index !== undefined &&
      endMatch.index > startMatch.index
    ) {
      const startIndex = startMatch.index;
      const endIndex = endMatch.index;

      // Extract the item details content (between start and end markers, excluding the markers themselves)
      const itemDetailsContent = product.descriptionHtml
        .substring(startIndex + startMatch[0].length, endIndex)
        .trim();

      // Get the content before the start marker
      const beforeStart = product.descriptionHtml.substring(0, startIndex);

      // Get the content after the end marker
      const afterEnd = product.descriptionHtml.substring(
        endIndex + endMatch[0].length
      );

      // Combine to create the main description without the item details section
      const mainDescription = (beforeStart + afterEnd).trim();

      return {
        mainDescription: mainDescription || null,
        itemDetailsHtml: itemDetailsContent || null,
      };
    }

    // If no markers found, return the original description
    return {
      mainDescription: product.descriptionHtml,
      itemDetailsHtml: null,
    };
  }, [product.descriptionHtml]);

  // Find the selected variant based on current state
  const selectedVariant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );

  // Use selected variant price or fall back to max variant price
  const displayPrice =
    selectedVariant?.price || product.priceRange.maxVariantPrice;
  const displayCurrencyCode =
    selectedVariant?.price?.currencyCode ||
    product.priceRange.maxVariantPrice.currencyCode;

  const menu = useMemo(() => {
    const baseSections: MenuSection[] = [
      {
        title: "Complimentary shipping & returns",
        description:
          "We offer complimentary and secure shipping to selected countries. Returns and exchanges are free of charge.",
        isHtml: false,
      },
      {
        title: "Exceptional quality & craftsmanship",
        description:
          "Our promise is high-end craftsmanship without the traditional luxury markup. Every piece is handcrafted to order in our workshop, combining timeless skill with modern, ethical gemstones. We use only the highest quality lab-grown diamonds, hand-selected for their sparkling brilliance, and exclusively use colorless DEF grades with VS1 clarity or higher to ensure maximum beauty.",
        isHtml: false,
      },
      {
        title: "Care & maintenance",
        description:
          "<p>To ensure your Nine Carats jewelry remains beautiful for years to come, please follow these care and maintenance guidelines.</p><br>\n\n<h5>Gold & Platinum Care</h5>\n<ul>\n <li>Take care to protect all your jewelry from impacts against hard surfaces and avoid contact with abrasive surfaces.</li>\n <li>Between professional servicing, most gold and platinum pieces can be maintained using a non-abrasive jewelry cleaner.</li>\n <li>Never expose gold jewelry to household bleach or other harsh chemicals. This may cause the gold to discolor or degrade.</li>\n</ul>\n\n<h5>Cleaning Your Diamonds</h5>\n<p>To clean diamonds at home, use a mild solution of six parts water to one part ammonia. Apply this solution gently with a soft-bristle brush.</p><br>\n\n<h5>Storage</h5>\n<p>Jewelry storage is crucial. At the time of purchase, all Nine Carats jewelry is presented in a protective box, case, or tarnish-resistant pouch. We recommend that between wearings, you place your jewelry back in its Nine Carats case or another suitably lined box or pouch to prevent scratching.</p><br>\n\n<h5>Professional Servicing</h5>\n<p>Dust, pollution, and daily wear can cloud the brilliance of a gemstone and dull the surface of precious metals. We suggest that your jewelry receive periodic professional maintenance to check your settings and give it a thorough, expert cleaning.</p>",
        isHtml: true,
      },
    ];

    // Add "Item details" section at the beginning if it exists
    if (itemDetailsHtml) {
      return [
        {
          title: "Product details",
          description: itemDetailsHtml,
          isHtml: true,
        },
        ...baseSections,
      ];
    }

    return baseSections;
  }, [itemDetailsHtml]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto p-4 lg:p-8 w-full">
      {/* Left Column - Product Description */}
      <div>
        <h2 className="text-lg sm:text-2xl text-black mb-2 hidden lg:block font-header">
          {product.title}
        </h2>
        <div className="text-sm text-neutral-500 mb-8 hidden lg:block">
          <Price
            amount={displayPrice.amount}
            currencyCode={displayCurrencyCode}
          />
        </div>
        <div className="mb-10 hidden lg:block">
          <VariantSelector
            options={product.options}
            variants={product.variants}
          />
        </div>
        {mainDescription ? (
          <Prose
            className="text-sm sm:text-base leading-relaxed text-black"
            html={mainDescription}
          />
        ) : product.descriptionHtml ? (
          <Prose
            className="text-sm sm:text-base leading-relaxed text-black"
            html={product.descriptionHtml}
          />
        ) : (
          <p className="text-sm sm:text-base leading-relaxed text-black">
            {product.description}
          </p>
        )}

        {/* Collapsible sections */}
        <div className="space-y-2">
          <div className="divide-y divide-neutral-200 pb-2 lg:pb-5">
            {menu.map((section, idx) => (
              <div key={section.title}>
                <button
                  className="w-full flex text-left justify-between py-5 text-sm font-normal focus:outline-none"
                  onClick={() => setOpen(open === idx ? null : idx)}
                  aria-expanded={open === idx}
                >
                  <h3 className="text-md uppercase text-black">
                    {section.title}
                  </h3>
                  <span
                    className={`transition-transform ${open === idx ? "rotate-180" : ""}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                    >
                      {" "}
                      <path d="M7 1L4 4L1 1" stroke="currentColor" />{" "}
                    </svg>
                  </span>
                </button>
                {/* Menu items */}
                {open === idx && (
                  <div
                    className={`pb-6 text-sm text-neutral-600 gap-2 ${section.isHtml ? "[&_h5]:text-md [&_h5]:font-medium [&_ul]:list-disc [&_ul]:mb-4 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:mt-2 [&_ol]:mt-2 [&_p]:mt-2" : ""}`}
                  >
                    {section.isHtml ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: section.description as string,
                        }}
                      />
                    ) : (
                      <p>{section.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Add to Cart */}
      <div className="space-y-4 justify-end hidden lg:flex">
        <div className="flex flex-col gap-4">
          <AddToCart product={product} />

          {/* Delivery info */}
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                strokeWidth="1.2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
              >
                <path
                  d="M8 19C9.10457 19 10 18.1046 10 17C10 15.8954 9.10457 15 8 15C6.89543 15 6 15.8954 6 17C6 18.1046 6.89543 19 8 19Z"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeMiterlimit="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M18 19C19.1046 19 20 18.1046 20 17C20 15.8954 19.1046 15 18 15C16.8954 15 16 15.8954 16 17C16 18.1046 16.8954 19 18 19Z"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeMiterlimit="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10.05 17H15V6.6C15 6.26863 14.7314 6 14.4 6H1"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M5.65 17H3.6C3.26863 17 3 16.7314 3 16.4V11.5"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M2 9L6 9"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M15 9H20.6101C20.8472 9 21.0621 9.13964 21.1584 9.35632L22.9483 13.3836C22.9824 13.4604 23 13.5434 23 13.6273V16.4C23 16.7314 22.7314 17 22.4 17H20.5"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M15 17H16"
                  stroke="#000000"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                ></path>
              </svg>
              <span>
                Note that all our pieces are handcrafted to order and delivery
                may take up to 2-3 weeks.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex flex-row gap-4 w-full">
    //   <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700 w-3/4">
    //     <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
    //     <div className="mr-auto w-auto rounded-full bg-black p-2 text-sm text-white">
    //       <Price
    //         amount={product.priceRange.maxVariantPrice.amount}
    //         currencyCode={product.priceRange.maxVariantPrice.currencyCode}
    //       />
    //     </div>
    //     <VariantSelector
    //       options={product.options}
    //       variants={product.variants}
    //     />
    //     {product.descriptionHtml ? (
    //       <Prose
    //         className="mb-6 text-sm leading-tight dark:text-white/[60%]"
    //         html={product.descriptionHtml}
    //       />
    //     ) : null}
    //   </div>
    //   <div className="flex w-full w-1/4">
    //     <AddToCart product={product} />
    //   </div>
    // </div>
  );
}

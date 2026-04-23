"use client";

import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { useMemo, useState } from "react";
import { AddToCart } from "../cart/add-to-cart";
import ProductMetafields from "../home/ProductMetafields";
import { CrossProductVariantSelector } from "./CrossProductVariantSelector";
import { ContactDiamondExpertButton } from "./DiamondExpertSidebar";
import { ProductPrice } from "./product-price";
import { VariantSelector } from "./variant-selector";

type MenuSection = {
  title: string;
  description: string;
  isHtml: boolean;
};

export function ProductDescription({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(null);

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
        endIndex + endMatch[0].length,
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
          <ProductMetafields metafields={product.metafields} className="mb-2" />
          <ProductPrice product={product} />
        </div>
        <div className="mb-10 hidden lg:block">
          <CrossProductVariantSelector handle={product.handle} />
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
      <div className="justify-end hidden lg:flex">
        <div className="flex flex-col gap-4 w-lg">
          <AddToCart product={product} />
          <ContactDiamondExpertButton />

          {/* Product highlights */}
          <div className="space-y-3 text-sm pt-1">
            {[
              {
                label: "DEF Colorless",
                detail: "Top 3% of all diamonds",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3h12l4 6-10 13L2 9z" />
                    <path d="M11 3L8 9l4 13 4-13-3-6" />
                    <path d="M2 9h20" />
                  </svg>
                ),
              },
              {
                label: "Made to order",
                detail: "Handcrafted in 2-3 weeks for you",
                icon: (
                  /* Iconoir: calendar */
                  <svg
                    width="16"
                    height="16"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 2V6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                label: "Free global shipping",
                detail: "",
                icon: (
                  /* Iconoir: globe */
                  <svg
                    width="16"
                    height="16"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 12.5L8 14.5L7 18L8 21"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 20.5L16.5 18L14 17V13.5L17 12.5L21.5 13"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 5.5L18.5 7L15 7.5V10.5L17.5 9.5H19.5L21.5 10.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 10.5L5 8.5L7.5 8L9.5 5L8.5 3"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              // {
              //   label: "Return policy",
              //   detail: "",
              //   icon: (
              //     /* Iconoir: refresh */
              //     <svg
              //       width="16"
              //       height="16"
              //       strokeWidth="1.5"
              //       viewBox="0 0 24 24"
              //       fill="none"
              //       xmlns="http://www.w3.org/2000/svg"
              //     >
              //       <path
              //         d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
              //         stroke="currentColor"
              //         strokeLinecap="round"
              //         strokeLinejoin="round"
              //       />
              //       <path
              //         d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
              //         stroke="currentColor"
              //         strokeLinecap="round"
              //         strokeLinejoin="round"
              //       />
              //     </svg>
              //   ),
              // },
            ].map(({ label, detail, icon }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="mt-0.5 text-neutral-500 shrink-0">{icon}</span>
                <span className="text-neutral-700">
                  <span className="font-medium text-neutral-900">{label}</span>
                  {detail && (
                    <span className="text-neutral-500"> {detail}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

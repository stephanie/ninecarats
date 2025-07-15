"use client";

import Price from "components/price";
import { Product } from "lib/shopify/types";
import { useState } from "react";
import { AddToCart } from "../cart/add-to-cart";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(null);

  const menu = [
    {
      title: "Complimentary shipping & returns",
      description:
        "We offer complimentary and secure shipping to selected countries. Returns and exchanges are free of charge.",
    },
    {
      title: "Care & maintenance",
      description:
        "To keep your jewelry looking its best, we recommend cleaning it with a soft cloth and avoiding harsh chemicals. For more detailed care instructions, please refer to our care guide.",
    },
    {
      title: "Exceptional quality & craftsmanship",
      description:
        "Meticulously selected by eye to find the perfect alignment of facets and angles, each of our diamonds is chosen for its exquisite brilliance and sparkle. Responsibly and ethically sourced, all of our diamonds are of the highest grade, a sign of its extraordinary beauty and quality, before being crafted by the finest artisans.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto p-4 lg:p-8 w-full">
      {/* Left Column - Product Description */}
      <div className="space-y-2 lg:space-y-8">
        <div>
          <h2 className="text-md sm:text-lg text-black mb-2 hidden lg:block">
            {product.title}
          </h2>
          <div className="text-md sm:text-lg text-neutral-500 mb-8 hidden lg:block">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
          <div className="mb-10 hidden lg:block">
            <VariantSelector
              options={product.options}
              variants={product.variants}
            />
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-black">
            {product.description}
          </p>
        </div>

        {/* Collapsible sections */}
        <div className="space-y-2">
          <div className="divide-y divide-neutral-200 py-2 lg:py-5">
            {menu.map((section, idx) => (
              <div key={section.title}>
                <button
                  className="w-full flex items-center justify-between py-5 text-sm font-normal focus:outline-none"
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
                  <div className="pb-8 text-sm text-neutral-600 gap-2">
                    <p>{section.description}</p>
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
                Order now. Complimentary express delivery by Wed, 16 Jul.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex flex-row gap-4 w-full">
    //   <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700 w-3/4">
    //     <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
    //     <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
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

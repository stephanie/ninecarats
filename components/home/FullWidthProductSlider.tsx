"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    name: "Classic Tennis Bracelet 1",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 2",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 3",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 4",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 5",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 6",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 7",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 8",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
];

export default function FullWidthProductSlider() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleDotClick = (pageIndex: number) => {
    if (pageIndex === currentPage || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const getCurrentPageProducts = () => {
    const startIndex = currentPage * productsPerPage;
    return products.slice(startIndex, startIndex + productsPerPage);
  };

  return (
    <section className="w-full px-4 lg:px-8 py-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="text-xs tracking-widest text-neutral-500 mb-4 uppercase">
            Day Jewelry
          </div>
          <h2 className="text-3xl md:text-4xl font-light mb-10">
            Our classic collection
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-700 mb-10">
            These fine bracelets offer a wide variety of forms to embellish the
            wrist. Juxtaposed in elegant combinations, they create a wealth of
            delicate possibilities.
          </p>
        </div>
        <div className="relative w-full mb-8 overflow-hidden">
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full transition-all duration-500 ease-in-out ${
              isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {getCurrentPageProducts().map((product, idx) => (
              <div
                className="flex flex-col gap-4 mb-8 transform transition-all duration-500 ease-out"
                key={`${currentPage}-${idx}`}
                style={{
                  animationDelay: `${idx * 100}ms`,
                  transform: isTransitioning
                    ? "translateY(20px)"
                    : "translateY(0)",
                  opacity: isTransitioning ? 0 : 1,
                }}
              >
                <div className="flex flex-col items-center bg-neutral-100 p-6">
                  <div className="w-full aspect-[3/4] relative mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      priority={idx === 0}
                    />
                  </div>
                </div>
                <div className="text-center flex flex-col">
                  <div className="text-sm md:text-base font-light mb-1">
                    {product.name}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-500">
                    {product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isTransitioning}
              className={`h-2 w-2 rounded-full transition-all duration-200 cursor-pointer ${
                index === currentPage
                  ? "bg-neutral-800 scale-110"
                  : "bg-neutral-300 hover:bg-neutral-400 hover:scale-110"
              } ${isTransitioning ? "opacity-50" : "opacity-100"}`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

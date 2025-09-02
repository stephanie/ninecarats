"use client";

import SliderDots from "components/slider/SliderDots";
import TextHeaderFull from "components/text/TextHeaderFull";
import { useIsMobile } from "hooks/useIsMobile";
import { Product } from "lib/shopify/types";
import { formatPrice } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface FullWidthProductSliderProps {
  products: Product[];
  tagline?: string;
  heading?: string;
  sectionDescription?: string;
  button?: React.ReactNode;
}

export default function FullWidthProductSlider({
  products,
  tagline,
  heading,
  sectionDescription,
  button,
}: FullWidthProductSliderProps) {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter out products without proper data
  const validProducts = products.filter(
    (product) =>
      product &&
      product.id &&
      product.title &&
      (product.priceRange?.maxVariantPrice?.amount ||
        product.priceRange?.minVariantPrice?.amount)
  );

  const productsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(validProducts.length / productsPerPage);

  // Return early if no valid products
  if (validProducts.length === 0) {
    return null;
  }

  const handleDotClick = (pageIndex: number) => {
    if (pageIndex === currentPage || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const nextPage = () => {
    if (isTransitioning) return;
    if (currentPage < totalPages - 1) {
      handleDotClick(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (isTransitioning) return;
    if (currentPage > 0) {
      handleDotClick(currentPage - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextPage,
    onSwipedRight: prevPage,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  // For mobile, show one product per page, with the next product peeking in
  let sliderContent;
  if (isMobile) {
    sliderContent = (
      <div className="relative w-full overflow-x-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${currentPage * 80}vw + 10vw))`,
          }}
        >
          {validProducts.map((product, idx) => (
            <Link href={`/product/${product.handle}`} key={product.id}>
              <div
                key={product.id}
                className="flex-shrink-0 w-[80vw] max-w-[340px] flex flex-col mb-8"
              >
                <div className="flex flex-col items-center p-2">
                  <div className="w-full aspect-[1/1] max-h-[40vh] relative mb-6">
                    <Image
                      src={
                        product.featuredImage?.url || "/images/placeholder.webp"
                      }
                      alt={product.featuredImage?.altText || product.title}
                      fill
                      className="object-contain bg-neutral-100"
                      sizes="80vw"
                      priority={idx === 0}
                    />
                  </div>
                </div>
                <div className="text-center flex flex-col">
                  <div className="text-lg mb-1 text-black font-header">
                    {product.title}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {product.priceRange?.maxVariantPrice?.amount
                      ? formatPrice(
                          Number(product.priceRange.maxVariantPrice.amount),
                          product.priceRange.maxVariantPrice.currencyCode ||
                            "USD"
                        )
                      : product.priceRange?.minVariantPrice?.amount
                        ? formatPrice(
                            Number(product.priceRange.minVariantPrice.amount),
                            product.priceRange.minVariantPrice.currencyCode ||
                              "USD"
                          )
                        : "Price unavailable"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    sliderContent = (
      <div className="relative w-full overflow-hidden px-4 mb-8">
        <div
          className={`grid grid-cols-3 gap-4 w-full transition-all duration-500 ease-in-out ${
            isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {validProducts
            .slice(
              currentPage * productsPerPage,
              currentPage * productsPerPage + productsPerPage
            )
            .map((product, idx) => (
              <Link href={`/product/${product.handle}`} key={product.id}>
                <div
                  className="flex flex-col gap-4 mb-2 transform transition-all duration-500 ease-out"
                  key={`${currentPage}-${product.id}`}
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    transform: isTransitioning
                      ? "translateY(20px)"
                      : "translateY(0)",
                    opacity: isTransitioning ? 0 : 1,
                  }}
                >
                  <div className="flex flex-col items-center bg-neutral-100 p-2">
                    <div className="w-full aspect-[1/1] max-h-[50vh] relative mb-8">
                      <Image
                        src={
                          product.featuredImage?.url ||
                          "/images/placeholder.webp"
                        }
                        alt={product.featuredImage?.altText || product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                  <div className="text-center flex flex-col">
                    <div className="text-lg mb-1 text-black font-header">
                      {product.title}
                    </div>
                    <div className="text-sm text-neutral-500">
                      {formatPrice(
                        Number(product.priceRange.maxVariantPrice.amount),
                        product.priceRange.maxVariantPrice.currencyCode
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full mb-8 sm:mb-16 bg-white">
      <div
        className="max-w-[100vw] mx-auto flex flex-col items-center"
        {...swipeHandlers}
      >
        {heading && (
          <div className="text-center p-8 sm:p-16">
            <TextHeaderFull
              tagline={tagline}
              description={sectionDescription}
              button={button}
              className="text-black"
            >
              {heading}
            </TextHeaderFull>
          </div>
        )}
        {sliderContent}
        <SliderDots
          total={totalPages}
          selected={currentPage}
          onSelect={handleDotClick}
          disabled={isTransitioning}
          className="mb-2 md:mb-4"
        />
      </div>
    </section>
  );
}

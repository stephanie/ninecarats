"use client";

import SliderDots from "components/slider/SliderDots";
import ButtonLink from "components/text/ButtonLink";
import TextHeaderFull from "components/text/TextHeaderFull";
import { useIsMobile } from "hooks/useIsMobile";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface Product {
  name: string;
  price?: string;
  image: string;
}

interface FullWidthProductSliderProps {
  products: Product[];
  tagline?: string;
  heading: string;
  sectionDescription?: string;
}

export default function FullWidthProductSlider({
  products,
  tagline,
  heading,
  sectionDescription,
}: FullWidthProductSliderProps) {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const productsPerPage = isMobile ? 1 : 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

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
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[80vw] max-w-[340px] flex flex-col mb-8"
            >
              <div className="flex flex-col items-center p-2">
                <div className="w-full aspect-[3/4] relative mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain bg-neutral-100"
                    sizes="80vw"
                    priority={idx === 0}
                  />
                </div>
              </div>
              <div className="text-center flex flex-col">
                <div className="text-sm md:text-base mb-1 text-black">
                  {product.name}
                </div>
                {product.price && (
                  <div className="text-sm md:text-base text-neutral-400">
                    {product.price}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    sliderContent = (
      <div className="relative w-full overflow-hidden px-4 mb-2">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full transition-all duration-500 ease-in-out ${
            isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {products
            .slice(
              currentPage * productsPerPage,
              currentPage * productsPerPage + productsPerPage
            )
            .map((product, idx) => (
              <div
                className="flex flex-col gap-4 mb-2 transform transition-all duration-500 ease-out"
                key={`${currentPage}-${idx}`}
                style={{
                  animationDelay: `${idx * 100}ms`,
                  transform: isTransitioning
                    ? "translateY(20px)"
                    : "translateY(0)",
                  opacity: isTransitioning ? 0 : 1,
                }}
              >
                <div className="flex flex-col items-center bg-neutral-100 p-2">
                  <div className="w-full aspect-[3/4] max-h-[40vh] relative mb-8">
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
                  <div className="text-sm mb-1 text-black">{product.name}</div>
                  {product.price && (
                    <div className="text-sm text-neutral-400">
                      {product.price}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-8 bg-white">
      <div
        className="max-w-[100vw] mx-auto flex flex-col items-center"
        {...swipeHandlers}
      >
        <div className="mb-8 text-center p-2 lg:p-10">
          <TextHeaderFull
            tagline={tagline}
            description={sectionDescription}
            button={<ButtonLink href="/shop">Shop</ButtonLink>}
            className="text-black"
          >
            {heading}
          </TextHeaderFull>
        </div>
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

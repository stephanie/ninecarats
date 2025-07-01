"use client";

import ButtonLink from "components/text/ButtonLink";
import Image from "next/image";
import { useState } from "react";

interface Product {
  productImage: string;
  productName: string;
  material: string;
  price: string;
  buttonText: string;
  buttonLink: string;
}

interface TwoColumnFeatureProps {
  products: Product[];
  rightImage: string;
  rightImageAlt?: string;
}

export default function TwoColumnFeature({
  products,
  rightImage,
  rightImageAlt,
}: TwoColumnFeatureProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDotClick = (slideIndex: number) => {
    if (slideIndex === currentSlide || isTransitioning || !products[slideIndex])
      return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(slideIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const currentProduct = products[currentSlide];

  // If no products or current product doesn't exist, don't render
  if (!products.length || !currentProduct) {
    return null;
  }

  return (
    <section className="w-full flex flex-col md:flex-row min-h-[100vh]">
      {/* Left: Product Info */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 bg-white gap-2">
        <div
          className={`mb-8 transition-all duration-500 ease-in-out ${
            isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="w-[220px] h-[220px] relative mx-auto">
            <Image
              src={currentProduct.productImage}
              alt={currentProduct.productName}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div
          className={`text-center transition-all duration-500 ease-in-out ${
            isTransitioning
              ? "opacity-50 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <h2 className="text-sm md:text-base font-light text-center mb-2">
            {currentProduct.productName}
          </h2>
          <div className="text-sm md:text-base font-light text-neutral-500 text-center mb-6">
            {currentProduct.price}
          </div>
        </div>
        {/* Slider dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: products.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              disabled={isTransitioning}
              className={`h-2 w-2 rounded-full transition-all duration-200 cursor-pointer ${
                i === currentSlide
                  ? "bg-neutral-800 scale-110"
                  : "bg-neutral-300 hover:bg-neutral-400 hover:scale-110"
              } ${isTransitioning ? "opacity-50" : "opacity-100"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div
          className={`transition-all duration-500 ease-in-out ${
            isTransitioning
              ? "opacity-50 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <ButtonLink href={currentProduct.buttonLink}>
            {currentProduct.buttonText}
          </ButtonLink>
        </div>
      </div>
      {/* Right: Model Image */}
      <div className="flex-1 min-h-[320px] relative">
        <Image
          src={rightImage}
          alt={rightImageAlt || "Some alt text"}
          fill
          className="object-cover object-center"
          priority
        />
        <ButtonLink
          href="#"
          className="absolute top-4 right-4 md:top-10 md:right-10 text-white hover:border-white"
        >
          Why we only use the highest grade diamonds
        </ButtonLink>
      </div>
    </section>
  );
}

"use client";

import { AnimatedText } from "components/animations";
import SliderDots from "components/slider/SliderDots";
import TextHeaderFull from "components/text/TextHeaderFull";
import { useIsMobile } from "hooks/useIsMobile";
import { useLowPowerMode } from "hooks/useLowPowerMode";
import { getProductMedia } from "lib/shopify";
import { Media, Product, Video } from "lib/shopify/types";
import { formatPrice } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const { lowPowerMode } = useLowPowerMode();
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [productMedia, setProductMedia] = useState<Record<string, Media[]>>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Set<string>>(
    new Set()
  );
  const hasFetchedMedia = useRef(false);

  // Filter out products without proper data
  const validProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product &&
        product.id &&
        product.title &&
        (product.priceRange?.maxVariantPrice?.amount ||
          product.priceRange?.minVariantPrice?.amount)
    );
  }, [products]);

  const productsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(validProducts.length / productsPerPage);

  // Fetch media data for products
  useEffect(() => {
    if (hasFetchedMedia.current || validProducts.length === 0) {
      return;
    }

    const fetchMediaForProducts = async () => {
      hasFetchedMedia.current = true;

      const mediaPromises = validProducts.map(async (product) => {
        try {
          const media = await getProductMedia(product.handle);
          return { productId: product.id, media };
        } catch (error) {
          console.error(
            `Failed to fetch media for product ${product.handle}:`,
            error
          );
          return { productId: product.id, media: [] };
        }
      });

      const results = await Promise.all(mediaPromises);
      const mediaMap: Record<string, Media[]> = {};
      results.forEach(({ productId, media }) => {
        mediaMap[productId] = media;
      });

      setProductMedia(mediaMap);
    };

    fetchMediaForProducts();
  }, [validProducts]);

  // Scroll detection for mobile video autoplay
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const productElements = document.querySelectorAll("[data-product-id]");
      const newVisibleProducts = new Set<string>();

      productElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          const productId = element.getAttribute("data-product-id");
          if (productId) {
            newVisibleProducts.add(productId);
          }
        }
      });

      setVisibleProducts(newVisibleProducts);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  // Helper function to find MP4 video from media
  const getMp4VideoUrl = (productId: string): string | null => {
    const media = productMedia[productId];
    if (!media) return null;

    const mp4Video = media.find((mediaItem): mediaItem is Video => {
      return (
        "sources" in mediaItem &&
        mediaItem.sources.some((source) => source.format === "mp4")
      );
    });

    return (
      mp4Video?.sources.find((source) => source.format === "mp4")?.url || null
    );
  };

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
            transform: `translateX(calc(-${currentPage * 80}vw + calc((100vw - 80vw) / 2)))`,
          }}
        >
          {validProducts.map((product, idx) => (
            <Link href={`/product/${product.handle}`} key={product.id}>
              <div
                key={product.id}
                className="flex-shrink-0 w-[80vw] max-w-[80vw] flex flex-col mb-8"
                data-product-id={product.id}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-full aspect-square h-[80vw] relative mb-6 group transition-colors duration-500 border border-neutral-200 ${
                      validProducts.length > 1 && idx === 0
                        ? "border-r-0"
                        : validProducts.length > 1 && idx === 2
                          ? "border-l-0"
                          : ""
                    } ${
                      hoveredProduct === product.id
                        ? "bg-white"
                        : "bg-neutral-100"
                    }`}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Image
                      src={
                        product.featuredImage?.url || "/images/placeholder.webp"
                      }
                      alt={product.featuredImage?.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="80vw"
                      priority={idx === 0}
                    />
                    {getMp4VideoUrl(product.id) &&
                      (isMobile
                        ? !lowPowerMode && visibleProducts.has(product.id)
                        : hoveredProduct === product.id) && (
                        <video
                          className="absolute inset-0 w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            display: "block",
                            margin: 0,
                            padding: 0,
                            outline: "none",
                            border: "none",
                          }}
                        >
                          <source
                            src={getMp4VideoUrl(product.id)!}
                            type="video/mp4"
                          />
                        </video>
                      )}
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
          className={`grid grid-cols-3 w-full transition-all duration-500 ease-in-out ${
            isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {validProducts
            .slice(
              currentPage * productsPerPage,
              currentPage * productsPerPage + productsPerPage
            )
            .map((product, idx) => (
              <div
                key={`${currentPage}-${product.id}`}
                className="flex flex-col mb-2 transform transition-all duration-500 ease-out"
                style={{
                  animationDelay: `${idx * 100}ms`,
                  transform: isTransitioning
                    ? "translateY(20px)"
                    : "translateY(0)",
                  opacity: isTransitioning ? 0 : 1,
                }}
              >
                <Link
                  href={`/product/${product.handle}`}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`w-full aspect-square max-h-[50vh] relative mb-8 group transition-colors duration-300 border border-neutral-200 ${
                      validProducts.length > 1 && idx === 0
                        ? "border-r-0"
                        : validProducts.length > 1 && idx === 2
                          ? "border-l-0"
                          : ""
                    }`}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Image
                      src={
                        product.featuredImage?.url || "/images/placeholder.webp"
                      }
                      alt={product.featuredImage?.altText || product.title}
                      fill
                      className="object-cover"
                      priority={idx === 0}
                    />
                    {getMp4VideoUrl(product.id) &&
                      hoveredProduct === product.id && (
                        <video
                          className="absolute inset-0 w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            display: "block",
                            margin: 0,
                            padding: 0,
                            outline: "none",
                            border: "none",
                          }}
                        >
                          <source
                            src={getMp4VideoUrl(product.id)!}
                            type="video/mp4"
                          />
                        </video>
                      )}
                  </div>
                  <div className="text-center flex flex-col">
                    <div className="text-lg mb-1 text-black font-header">
                      <AnimatedText direction="up" staggerDelay={200}>
                        {product.title}
                      </AnimatedText>
                    </div>
                    <div className="text-sm text-neutral-500">
                      <AnimatedText direction="up" staggerDelay={300}>
                        {formatPrice(
                          Number(product.priceRange.maxVariantPrice.amount),
                          product.priceRange.maxVariantPrice.currencyCode
                        )}
                      </AnimatedText>
                    </div>
                  </div>
                </Link>
              </div>
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

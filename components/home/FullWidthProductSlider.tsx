"use client";

import SliderProgressBar from "components/slider/SliderProgressBar";
import TextHeaderFull from "components/text/TextHeaderFull";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "hooks/useIsMobile";
import { useLowPowerMode } from "hooks/useLowPowerMode";
import { getProductMedia } from "lib/shopify";
import { Media, Product, Video } from "lib/shopify/types";
import { formatPrice } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductMetafields from "./ProductMetafields";

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
  sectionDescription: _sectionDescription,
  button,
}: FullWidthProductSliderProps) {
  const isMobile = useIsMobile();
  const { lowPowerMode } = useLowPowerMode();
  const [productMedia, setProductMedia] = useState<Record<string, Media[]>>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [visibleProducts, setVisibleProducts] = useState<Set<string>>(
    new Set(),
  );

  const validProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product &&
        product.id &&
        product.title &&
        (product.priceRange?.maxVariantPrice?.amount ||
          product.priceRange?.minVariantPrice?.amount),
    );
  }, [products]);

  const slideIds = useMemo(
    () => validProducts.map((p) => p.id).join(","),
    [validProducts],
  );
  const canLoop = validProducts.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: canLoop,
    align: "center",
    containScroll: false,
    dragFree: false,
    duration: 35,
  });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({
      loop: canLoop,
      align: "center",
      containScroll: false,
      dragFree: false,
      duration: 35,
    });
  }, [emblaApi, canLoop, slideIds]);

  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(emblaApi.scrollProgress());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollProgress();
    emblaApi.on("scroll", updateScrollProgress);
    emblaApi.on("reInit", updateScrollProgress);
    emblaApi.on("select", updateScrollProgress);
    emblaApi.on("settle", updateScrollProgress);

    return () => {
      emblaApi.off("scroll", updateScrollProgress);
      emblaApi.off("reInit", updateScrollProgress);
      emblaApi.off("select", updateScrollProgress);
      emblaApi.off("settle", updateScrollProgress);
    };
  }, [emblaApi, updateScrollProgress]);

  useEffect(() => {
    setProductMedia({});

    if (validProducts.length === 0) {
      return;
    }

    let cancelled = false;

    const fetchMediaForProducts = async () => {
      const mediaPromises = validProducts.map(async (product) => {
        try {
          const media = await getProductMedia(product.handle);
          return { productId: product.id, media };
        } catch (error) {
          console.error(
            `Failed to fetch media for product ${product.handle}:`,
            error,
          );
          return { productId: product.id, media: [] };
        }
      });

      const results = await Promise.all(mediaPromises);
      if (cancelled) return;

      const mediaMap: Record<string, Media[]> = {};
      results.forEach(({ productId, media }) => {
        mediaMap[productId] = media;
      });

      setProductMedia(mediaMap);
    };

    fetchMediaForProducts();

    return () => {
      cancelled = true;
    };
  }, [validProducts]);

  useEffect(() => {
    if (!isMobile) return;

    const updateVisible = () => {
      const productElements = document.querySelectorAll("[data-product-id]");
      const newVisibleProducts = new Set<string>();

      productElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;

        if (inView) {
          const productId = element.getAttribute("data-product-id");
          if (productId) newVisibleProducts.add(productId);
        }
      });

      setVisibleProducts(newVisibleProducts);
    };

    updateVisible();
    window.addEventListener("scroll", updateVisible);
    window.addEventListener("resize", updateVisible);
    emblaApi?.on("scroll", updateVisible);
    emblaApi?.on("settle", updateVisible);

    return () => {
      window.removeEventListener("scroll", updateVisible);
      window.removeEventListener("resize", updateVisible);
      emblaApi?.off("scroll", updateVisible);
      emblaApi?.off("settle", updateVisible);
    };
  }, [isMobile, emblaApi]);

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

  const getPrice = (product: Product) => {
    return product.priceRange?.minVariantPrice?.amount
      ? formatPrice(
          Number(product.priceRange.minVariantPrice.amount),
          product.priceRange.minVariantPrice.currencyCode,
        )
      : product.priceRange?.maxVariantPrice?.amount
        ? formatPrice(
            Number(product.priceRange.maxVariantPrice.amount),
            product.priceRange.maxVariantPrice.currencyCode,
          )
        : "Price unavailable";
  };

  if (validProducts.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 w-full bg-white sm:mb-16">
      <div className="mx-auto flex max-w-[100vw] flex-col items-center">
        {heading && (
          <div className="p-16 text-center">
            <TextHeaderFull
              tagline={tagline}
              button={button}
              className="text-black"
            >
              {heading}
            </TextHeaderFull>
          </div>
        )}
        <div className="relative mb-8 w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-stretch">
              {validProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="min-w-0 flex-[0_0_65%] px-2 md:flex-[0_0_28%] md:px-3"
                  data-product-id={product.id}
                >
                  <Link
                    href={`/product/${product.handle}`}
                    className="flex flex-col"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className="group relative mb-6 aspect-square w-full max-md:bg-white md:max-h-[50vh] md:transition-colors md:duration-300"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <Image
                          src={
                            product.featuredImage?.url ||
                            "/images/placeholder.webp"
                          }
                          alt={product.featuredImage?.altText || product.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 28vw, 65vw"
                          priority={idx === 0}
                        />
                        {getMp4VideoUrl(product.id) &&
                          (isMobile
                            ? !lowPowerMode && visibleProducts.has(product.id)
                            : hoveredProduct === product.id) && (
                            <video
                              className="absolute inset-0 h-full w-full object-cover"
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
                    <div className="flex flex-col text-center">
                      <div className="font-header text-lg text-black">
                        {product.title}
                      </div>
                      <ProductMetafields
                        metafields={product.metafields}
                        className="mt-1 justify-center"
                      />
                      <div className="mt-4 text-xs text-neutral-500">
                        {getPrice(product)}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {canLoop ? (
          <SliderProgressBar
            progress={scrollProgress}
            className="md:mb-8 md:mt-8 mb-4 mt-4 w-full max-w-xs px-6 md:max-w-md"
            trackHeightClass="1.5"
            thumbHeightClass="1.5"
          />
        ) : null}
      </div>
    </section>
  );
}

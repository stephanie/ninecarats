"use client";

import { useIsMobile } from "hooks/useIsMobile";
import { Collection } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useSwipeable } from "react-swipeable";

interface SubCollectionWithImage extends Collection {
  imageUrl: string | null;
  imageAlt: string;
}

interface SubCollectionCarouselClientProps {
  mainCollectionHandle: string;
  subCollections: SubCollectionWithImage[];
}

export default function SubCollectionCarouselClient({
  mainCollectionHandle,
  subCollections,
}: SubCollectionCarouselClientProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile && containerRef.current) {
        const container = containerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        // Only scroll if there's more content to the right
        if (scrollLeft + clientWidth < scrollWidth) {
          container.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    },
    onSwipedRight: () => {
      if (isMobile && containerRef.current) {
        const container = containerRef.current;
        const { scrollLeft } = container;
        // Only scroll if there's content to the left
        if (scrollLeft > 0) {
          container.scrollBy({ left: -300, behavior: "smooth" });
        }
      }
    },
    trackMouse: true,
  });

  return (
    <div className="w-full mb-8 sm:mb-12 overflow-hidden" {...swipeHandlers}>
      <div
        ref={containerRef}
        className={`flex ${
          isMobile
            ? "overflow-x-auto gap-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            : "gap-6 justify-center flex-wrap"
        }`}
        style={{
          scrollSnapType: isMobile ? "x mandatory" : undefined,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {subCollections.map((collection) => (
          <Link
            key={collection.handle}
            href={`/search/${mainCollectionHandle}?subCollection=${collection.handle}`}
            className={`${
              isMobile
                ? "flex-shrink-0 w-[38vw] scroll-snap-align-start"
                : "w-[15vw]"
            } group`}
          >
            <div className="relative aspect-square w-full overflow-hidden">
              {collection.imageUrl ? (
                <Image
                  src={collection.imageUrl}
                  alt={collection.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 768px) 300px, 280px"
                />
              ) : (
                <div className="w-full h-full bg-primary" />
              )}
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-sm font-body text-black uppercase tracking-wide">
                {collection.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

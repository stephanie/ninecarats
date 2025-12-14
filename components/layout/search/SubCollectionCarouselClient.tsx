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
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    },
    onSwipedRight: () => {
      if (isMobile && containerRef.current) {
        containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
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
                ? "flex-shrink-0 w-[200px] scroll-snap-align-start"
                : "w-[200px]"
            } group`}
          >
            <div className="relative aspect-square w-full overflow-hidden bg-primary">
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
              <h3 className="text-xs font-body text-black uppercase tracking-wide">
                {collection.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { AnimatedText } from "components/animations";
import { useIsMobile } from "hooks/useIsMobile";
import { getProductMedia } from "lib/shopify";
import { Media, Video } from "lib/shopify/types";
import { formatPrice } from "lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function GridTileImage({
  src,
  alt,
  isInteractive = true,
  active,
  label,
  index,
  productHandle,
  isLast,
  ...props
}: {
  src: string;
  alt: string;
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
  };
  key?: string;
  index: number;
  productHandle?: string;
  isLast?: boolean;
} & React.ComponentProps<typeof Image>) {
  const [productMedia, setProductMedia] = useState<Media[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  // Fetch media data for the product
  useEffect(() => {
    if (!productHandle) return;

    const fetchMedia = async () => {
      try {
        const media = await getProductMedia(productHandle);
        setProductMedia(media);
      } catch (error) {
        console.error(
          `Failed to fetch media for product ${productHandle}:`,
          error
        );
      }
    };

    fetchMedia();
  }, [productHandle]);

  // Helper function to find MP4 video from media
  const getMp4VideoUrl = (): string | null => {
    const mp4Video = productMedia.find((mediaItem): mediaItem is Video => {
      return (
        "sources" in mediaItem &&
        mediaItem.sources.some((source) => source.format === "mp4")
      );
    });

    return (
      mp4Video?.sources.find((source) => source.format === "mp4")?.url || null
    );
  };
  return (
    <div className="flex-shrink-0 w-full flex flex-col pb-8">
      <div className="flex flex-col items-center">
        <div
          className={`w-full aspect-square border border-neutral-200 relative group transition-colors duration-300 ${
            isMobile
              ? index % 2 === 0
                ? "border-r-0"
                : index % 2 === 1
                  ? "border-r-1"
                  : ""
              : index % 3 === 0
                ? "border-r-0"
                : index % 3 === 2
                  ? "border-l-0"
                  : ""
          } ${isLast ? "border-r-1" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image src={src} alt={alt} fill className="object-cover" />
          {getMp4VideoUrl() && isHovered && (
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
              <source src={getMp4VideoUrl()!} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div className="text-center flex flex-col pt-8 pl-1 pr-1">
        <div className="text-lg text-black font-header">
          <AnimatedText direction="up" staggerDelay={200}>
            {label?.title}
          </AnimatedText>
        </div>
        {label?.amount && (
          <div className="text-sm text-neutral-500">
            <AnimatedText direction="up" staggerDelay={300}>
              {formatPrice(Number(label?.amount), label?.currencyCode)}
            </AnimatedText>
          </div>
        )}
      </div>
    </div>
  );
}

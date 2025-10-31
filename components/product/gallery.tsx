"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { Media, Video } from "lib/shopify/types";
import Image from "next/image";
import { useRef, useState } from "react";

export function Gallery({
  images,
  media,
  backgroundColor,
}: {
  images: { src: string; altText: string }[];
  media?: Media[];
  backgroundColor?: string;
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  // Find MP4 video from media
  const mp4Video = media?.find((mediaItem): mediaItem is Video => {
    return (
      "sources" in mediaItem &&
      mediaItem.sources.some((source) => source.format === "mp4")
    );
  });

  const mp4VideoUrl = mp4Video?.sources.find(
    (source) => source.format === "mp4"
  )?.url;
  const [showVideo, setShowVideo] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePlayVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mp4VideoUrl) {
      e.preventDefault();
      e.stopPropagation();
      setShowVideo(true);
    }
  };

  return (
    <form>
      <div
        ref={galleryRef}
        className={`relative aspect-square h-full max-h-[75vh] w-full overflow-hidden ${mp4VideoUrl ? (isHovering ? "cursor-none" : "cursor-pointer") : ""}`}
        onMouseEnter={() => mp4VideoUrl && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={handlePlayVideo}
      >
        <div className={`flex flex-col items-center p-2`}>
          <div className="w-full aspect-square max-h-[75vh] relative mb-8">
            {images[imageIndex] && (
              <Image
                className="h-full w-full object-contain"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={images[imageIndex]?.altText as string}
                src={images[imageIndex]?.src as string}
                priority={true}
              />
            )}
          </div>
          <div className="absolute bottom-[5%] right-[5%] lg:right-[2%] w-full flex justify-end pointer-events-none">
            {mp4VideoUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowVideo(true);
                }}
                className="text-black px-2 py-2 transition-all duration-200 border-b border-gray-500 pointer-events-auto"
              >
                Play video
              </button>
            )}
          </div>
        </div>

        {/* Custom cursor with play button */}
        {isHovering && mp4VideoUrl && (
          <div
            className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M9.208 6.04936C9.08654 5.97735 8.94818 5.93876 8.80699 5.93753C8.66579 5.9363 8.52678 5.97246 8.40408 6.04234C8.28138 6.11222 8.17937 6.21333 8.10839 6.3354C8.03742 6.45748 8.00002 6.59616 8 6.73736V25.2627C8.00002 25.4039 8.03742 25.5426 8.10839 25.6646C8.17937 25.7867 8.28138 25.8878 8.40408 25.9577C8.52678 26.0276 8.66579 26.0638 8.80699 26.0625C8.94818 26.0613 9.08654 26.0227 9.208 25.9507L24.8387 16.688C24.958 16.6172 25.0569 16.5165 25.1256 16.3959C25.1943 16.2753 25.2304 16.1388 25.2304 16C25.2304 15.8612 25.1943 15.7248 25.1256 15.6042C25.0569 15.4835 24.958 15.3829 24.8387 15.312L9.208 6.04936Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full">
            {images.length > 1 ? (
              <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
                {images.map((image, index) => {
                  const isActive = index === imageIndex;

                  return (
                    <li key={image.src} className="h-20 w-20">
                      <button
                        formAction={() => {
                          const newState = updateImage(index.toString());
                          updateURL(newState);
                        }}
                        aria-label="Select product image"
                        className="h-full w-full"
                      >
                        <GridTileImage
                          alt={image.altText}
                          src={image.src}
                          width={80}
                          height={80}
                          active={isActive}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null} */}
      </div>

      {/* Video Modal */}
      {showVideo && mp4VideoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowVideo(false);
            }
          }}
        >
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 z-10 flex items-center justify-center cursor-pointer"
          >
            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
          </button>
          <video
            controls
            className="w-full h-auto max-h-[100vh] object-contain"
            style={{
              display: "block",
              margin: 0,
              padding: 0,
              outline: "none",
              border: "none",
              backgroundColor: "white",
            }}
            preload="metadata"
            autoPlay
          >
            <source src={mp4VideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </form>
  );
}

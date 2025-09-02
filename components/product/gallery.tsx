"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { Media, Video } from "lib/shopify/types";
import Image from "next/image";
import { useState } from "react";

export function Gallery({
  images,
  media,
}: {
  images: { src: string; altText: string }[];
  media?: Media[];
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

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[75vh] w-full overflow-hidden">
        <div className="flex flex-col items-center bg-neutral-100 p-2">
          <div className="w-full aspect-[1/1] max-h-[75vh] relative mb-8">
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
          <div className="absolute bottom-[5%] right-[5%] lg:right-[2%] w-full flex justify-end">
            {mp4VideoUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowVideo(true);
                }}
                className="text-black px-2 py-2 transition-all duration-200 border-b border-gray-500 cursor-pointer"
              >
                Play video
              </button>
            )}
          </div>
        </div>

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

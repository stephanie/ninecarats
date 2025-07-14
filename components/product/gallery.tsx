"use client";

import { useProduct, useUpdateURL } from "components/product/product-context";
import ButtonLink from "components/text/ButtonLink";
import Image from "next/image";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

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
            <ButtonLink href="#" className="text-black hover:border-black">
              View 360°
            </ButtonLink>{" "}
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
    </form>
  );
}

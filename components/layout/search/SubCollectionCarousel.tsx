import { getSubCollections } from "lib/shopify/sub-collections";
import { Collection } from "lib/shopify/types";
import SubCollectionCarouselClient from "./SubCollectionCarouselClient";

interface SubCollectionCarouselProps {
  mainCollectionHandle: string;
  collections: Collection[];
}

export default function SubCollectionCarousel({
  mainCollectionHandle,
  collections,
}: SubCollectionCarouselProps) {
  const subCollectionConfigs = getSubCollections(mainCollectionHandle);

  if (subCollectionConfigs.length === 0) {
    return null;
  }

  // Get collection objects for the sub-collections and merge with config
  const subCollectionsWithImages = subCollectionConfigs
    .map((config) => {
      const collection = collections.find(
        (c) => c.handle.toLowerCase() === config.handle.toLowerCase()
      );
      if (!collection) return null;

      return {
        ...collection,
        imageUrl: config.imagePath || null,
        imageAlt: config.imageAlt || collection.title,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (subCollectionsWithImages.length === 0) {
    return null;
  }

  return (
    <SubCollectionCarouselClient
      mainCollectionHandle={mainCollectionHandle}
      subCollections={subCollectionsWithImages}
    />
  );
}

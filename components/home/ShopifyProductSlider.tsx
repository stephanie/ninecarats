import ButtonLink from "components/text/ButtonLink";
import { getCollection, getCollectionProducts } from "lib/shopify";
import { Suspense } from "react";
import FullWidthProductSlider from "./FullWidthProductSlider";

interface ShopifyProductSliderProps {
  collectionHandle: string;
  tagline?: string;
  maxProducts?: number;
}

export default async function ShopifyProductSlider({
  collectionHandle,
  tagline,
  maxProducts = 8,
}: ShopifyProductSliderProps) {
  try {
    // Fetch collection and products data
    const [collection, products] = await Promise.all([
      getCollection(collectionHandle),
      getCollectionProducts({
        collection: collectionHandle,
        sortKey: "CREATED",
        reverse: true, // Get newest products first
      }),
    ]);

    // Limit products to maxProducts
    const limitedProducts = products.slice(0, maxProducts);

    // Debug: Log product data structure (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log(
        `Fetched ${limitedProducts.length} products for collection: ${collectionHandle}`
      );
    }

    // If no products found, return null or a placeholder
    if (limitedProducts.length === 0) {
      console.warn(`No products found for collection: ${collectionHandle}`);
      return null;
    }

    // Generate heading, description, and button from collection data
    const heading =
      collection?.title ||
      collectionHandle.charAt(0).toUpperCase() + collectionHandle.slice(1);
    const sectionDescription =
      collection?.description ||
      `Discover our beautiful ${heading.toLowerCase()} collection.`;
    const button = (
      <ButtonLink
        href={`/search/${collectionHandle}`}
        className="text-black hover:border-black"
      >
        Shop our collection
      </ButtonLink>
    );

    return (
      <Suspense
        fallback={<div className="w-full h-96 bg-neutral-100 animate-pulse" />}
      >
        <FullWidthProductSlider
          products={limitedProducts}
          tagline={tagline}
          heading={heading}
          sectionDescription={sectionDescription}
          button={button}
        />
      </Suspense>
    );
  } catch (error) {
    console.error(
      `Error fetching products for collection ${collectionHandle}:`,
      error
    );
    return null;
  }
}

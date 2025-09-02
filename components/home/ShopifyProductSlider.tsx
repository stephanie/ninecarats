import { getCollectionProducts } from "lib/shopify";
import FullWidthProductSlider from "./FullWidthProductSlider";

interface ShopifyProductSliderProps {
  collectionHandle: string;
  tagline?: string;
  heading?: string;
  sectionDescription?: string;
  button?: React.ReactNode;
  maxProducts?: number;
}

export default async function ShopifyProductSlider({
  collectionHandle,
  tagline,
  heading,
  sectionDescription,
  button,
  maxProducts = 8,
}: ShopifyProductSliderProps) {
  try {
    // Fetch products from the specified collection
    const products = await getCollectionProducts({
      collection: collectionHandle,
      sortKey: "CREATED",
      reverse: true, // Get newest products first
    });

    // Limit products to maxProducts
    const limitedProducts = products.slice(0, maxProducts);

    // Debug: Log product data structure
    console.log(
      `Fetched ${limitedProducts.length} products for collection: ${collectionHandle}`
    );
    if (limitedProducts.length > 0) {
      const sampleProduct = limitedProducts[0];
      console.log("Sample product structure:", {
        id: sampleProduct?.id,
        title: sampleProduct?.title,
        hasPriceRange: !!sampleProduct?.priceRange,
        hasMaxVariantPrice: !!sampleProduct?.priceRange?.maxVariantPrice,
        hasFeaturedImage: !!sampleProduct?.featuredImage,
      });
    }

    // If no products found, return null or a placeholder
    if (limitedProducts.length === 0) {
      console.warn(`No products found for collection: ${collectionHandle}`);
      return null;
    }

    return (
      <FullWidthProductSlider
        products={limitedProducts}
        tagline={tagline}
        heading={heading}
        sectionDescription={sectionDescription}
        button={button}
      />
    );
  } catch (error) {
    console.error(
      `Error fetching products for collection ${collectionHandle}:`,
      error
    );
    return null;
  }
}

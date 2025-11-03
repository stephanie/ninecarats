import FullWidthProductSlider from "components/home/FullWidthProductSlider";
import { getCollectionProducts, getCollections } from "lib/shopify";
import { Product } from "lib/shopify/types";

interface RelatedProductsSliderProps {
  currentProduct: Product;
  heading?: string;
  maxProducts?: number;
}

// Define collection mapping - which collections to show for each product type
const COLLECTION_MAPPING: Record<string, string[]> = {
  bracelets: ["necklaces"],
  necklaces: ["bracelets"],
  default: ["bracelets", "necklaces"],
};

export default async function RelatedProductsSlider({
  currentProduct,
  heading,
  maxProducts = 6,
}: RelatedProductsSliderProps) {
  try {
    // Get all available collections
    const collections = await getCollections();

    // Determine the current product's collection based on tags or other logic
    // For now, we'll use a simple approach based on product tags
    const currentProductTags = currentProduct.tags.map((tag) =>
      tag.toLowerCase()
    );

    // Find the current product's primary collection
    let currentCollection = "default";
    for (const tag of currentProductTags) {
      if (["bracelets", "necklaces"].includes(tag)) {
        currentCollection = tag;
        break;
      }
    }

    // Get alternative collections to show
    const alternativeCollections =
      COLLECTION_MAPPING[currentCollection] || COLLECTION_MAPPING.default;

    // Try to fetch products from alternative collections
    let relatedProducts: Product[] = [];

    for (const collectionHandle of alternativeCollections || []) {
      try {
        const products = await getCollectionProducts({
          collection: collectionHandle,
          sortKey: "MANUAL", // Respect manual ordering from Shopify Admin
          reverse: false,
        });

        // Filter out the current product
        const filteredProducts = products.filter(
          (product) => product.id !== currentProduct.id
        );

        if (filteredProducts.length > 0) {
          relatedProducts = [...relatedProducts, ...filteredProducts];
          break; // Use the first collection that has products
        }
      } catch (error) {
        console.warn(
          `Failed to fetch products from collection ${collectionHandle}:`,
          error
        );
        continue;
      }
    }

    // If no products found from alternative collections, try any collection
    if (relatedProducts.length === 0) {
      for (const collection of collections) {
        if (collection.handle !== currentCollection) {
          try {
            const products = await getCollectionProducts({
              collection: collection.handle,
              sortKey: "MANUAL", // Respect manual ordering from Shopify Admin
              reverse: false,
            });

            const filteredProducts = products.filter(
              (product) => product.id !== currentProduct.id
            );
            if (filteredProducts.length > 0) {
              relatedProducts = [...relatedProducts, ...filteredProducts];
              break;
            }
          } catch (error) {
            continue;
          }
        }
      }
    }

    // Limit products
    const limitedProducts = relatedProducts.slice(0, maxProducts);

    if (limitedProducts.length === 0) {
      console.warn("No related products found");
      return null;
    }

    return (
      <FullWidthProductSlider products={limitedProducts} heading={heading} />
    );
  } catch (error) {
    console.error("Error fetching related products:", error);
    return null;
  }
}

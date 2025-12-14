// Sub-collection configuration with handle and optional image path
export interface SubCollectionConfig {
  handle: string;
  imagePath?: string;
  imageAlt?: string;
}

// Mapping of main collections to their sub-collections
// Sub-collections are collections that should be displayed as category cards
// When clicked, they filter products to show items in BOTH the main collection AND the sub-collection
export const SUB_COLLECTION_MAPPING: Record<string, SubCollectionConfig[]> = {
  necklaces: [
    {
      handle: "yellow-gold",
      imagePath: "/images/collections/necklaces-yellow-gold.png",
      imageAlt: "Yellow Gold Necklaces",
    },
    {
      handle: "platinum",
      imagePath: "/images/collections/necklaces-platinum.png",
      imageAlt: "Platinum Necklaces",
    },
    {
      handle: "signature",
      imagePath: "/images/collections/necklaces-signature.png",
      imageAlt: "Signature Necklaces",
    },
  ],
};

// Get sub-collections for a given main collection handle
export function getSubCollections(
  mainCollectionHandle: string
): SubCollectionConfig[] {
  return SUB_COLLECTION_MAPPING[mainCollectionHandle.toLowerCase()] || [];
}


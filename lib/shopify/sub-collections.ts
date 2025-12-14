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
      imagePath: "/images/collections/necklaces-yellow-gold.avif",
      imageAlt: "Yellow Gold Necklaces",
    },
    {
      handle: "platinum",
      imagePath: "/images/collections/necklaces-platinum.avif",
      imageAlt: "Platinum Necklaces",
    },
    {
      handle: "signature",
      imagePath: "/images/collections/necklaces-signature.avif",
      imageAlt: "Signature Necklaces",
    },
  ],
  rings: [
    {
      handle: "engagement-rings",
      imagePath: "/images/collections/rings-oval-gold.avif",
      imageAlt: "Engagement Rings",
    },
    {
      handle: "bands",
      imagePath: "/images/collections/rings-oval-band.avif",
      imageAlt: "Bands",
    },
    {
      handle: "platinum",
      imagePath: "/images/collections/rings-cushion-cut.avif",
      imageAlt: "Platinum Rings",
    },
    {
      handle: "yellow-gold",
      imagePath: "/images/collections/rings-emerald-band.avif",
      imageAlt: "Yellow Gold Rings",
    },
  ],
  // bracelets: [
  //   {
  //     handle: "yellow-gold",
  //     imagePath: "/images/collections/necklaces-yellow-gold.avif",
  //     imageAlt: "Yellow Gold Bracelets",
  //   },
  //   {
  //     handle: "platinum",
  //     imagePath: "/images/collections/necklaces-yellow-gold.avif",
  //     imageAlt: "Platinum Bracelets",
  //   },
  //   {
  //     handle: "signature",
  //     imagePath: "/images/collections/necklaces-signature.avif",
  //     imageAlt: "Signature Bracelets",
  //   },
  // ],
  // earrings: [
  //   {
  //     handle: "signature",
  //     imagePath: "/images/collections/necklaces-signature.avif",
  //     imageAlt: "Signature Earrings",
  //   },
  //   {
  //     handle: "emerald",
  //     imagePath: "/images/collections/necklaces-signature.avif",
  //     imageAlt: "Emerald Cut Earrings",
  //   },
  // ],
};

// Get sub-collections for a given main collection handle
export function getSubCollections(
  mainCollectionHandle: string
): SubCollectionConfig[] {
  return SUB_COLLECTION_MAPPING[mainCollectionHandle.toLowerCase()] || [];
}


export type VariantLinkOption = {
  label: string;
  handle: string; // product handle to link to
};

export type VariantLinkGroup = {
  label: string; // e.g. "Metal" or "Carat Weight"
  options: VariantLinkOption[];
};

// Map each product handle to the cross-product variant groups shown on that page.
// The active option is determined by matching option.handle to the current page handle.
// Add an entry here for every product that should show these selectors.
export const variantLinkConfig: Record<string, VariantLinkGroup[]> = {
  // --- Signature Tennis Bracelet family ---
  "the-signature-tennis-bracelet": [
    {
      label: "Metal",
      options: [
        { label: "Platinum", handle: "the-signature-tennis-bracelet" },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-bracelet-yellow-gold",
        },
      ],
    },
    {
      label: "Carat Weight",
      options: [
        { label: "5 Carats", handle: "the-signature-tennis-bracelet-5-carats" },
        {
          label: "8.6 Carats",
          handle: "the-signature-tennis-bracelet-8-carats",
        },
        {
          label: "9.3 Carats",
          handle: "the-signature-tennis-bracelet",
        },
      ],
    },
  ],
  "the-signature-tennis-bracelet-yellow-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-tennis-bracelet",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-bracelet-yellow-gold",
        },
      ],
    },
    {
      label: "Carat Weight",
      options: [
        {
          label: "5 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold-5-carats",
        },
        {
          label: "8 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold-8-carats",
        },
        {
          label: "9.3 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold",
        },
      ],
    },
  ],
  "the-signature-tennis-bracelet-8-carats": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-tennis-bracelet-8-carats",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-bracelet-yellow-gold-8-carats",
        },
      ],
    },
    {
      label: "Carat Weight",
      options: [
        {
          label: "5 Carats",
          handle: "the-signature-tennis-bracelet-5-carats",
        },
        {
          label: "8.6 Carats",
          handle: "the-signature-tennis-bracelet-8-carats",
        },
        {
          label: "9.3 Carats",
          handle: "the-signature-tennis-bracelet",
        },
      ],
    },
  ],
  "the-signature-tennis-bracelet-yellow-gold-8-carats": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-tennis-bracelet-8-carats",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-bracelet-yellow-gold-8-carats",
        },
      ],
    },
    {
      label: "Carat Weight",
      options: [
        {
          label: "5 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold-5-carats",
        },
        {
          label: "8 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold-8-carats",
        },
        {
          label: "9.3 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold",
        },
      ],
    },
  ],
  "the-signature-tennis-bracelet-5-carats": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-tennis-bracelet-5-carats",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-bracelet-yellow-gold-5-carats",
        },
      ],
    },
    {
      label: "Carat Weight",
      options: [
        {
          label: "5 Carats",
          handle: "the-signature-tennis-bracelet-5-carats",
        },
        {
          label: "8.6 Carats",
          handle: "the-signature-tennis-bracelet-8-carats",
        },
        {
          label: "9.3 Carats",
          handle: "the-signature-tennis-bracelet",
        },
      ],
    },
  ],
  "the-signature-tennis-bracelet-yellow-gold-5-carats": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-tennis-bracelet-5-carats",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-bracelet-yellow-gold-5-carats",
        },
      ],
    },
    {
      label: "Carat Weight",
      options: [
        {
          label: "5 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold-5-carats",
        },
        {
          label: "8.6 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold-8-carats",
        },
        {
          label: "9.3 Carats",
          handle: "the-signature-tennis-bracelet-yellow-gold",
        },
      ],
    },
  ],
  "the-signature-tennis-necklace": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-tennis-necklace",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-necklace-yellow-gold",
        },
      ],
    },
  ],
  "the-signature-tennis-necklace-yellow-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-tennis-necklace",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-tennis-necklace-yellow-gold",
        },
      ],
    },
  ],
  "the-signature-oval-ring-yellow-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-oval-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-oval-ring-yellow-gold",
        },
      ],
    },
  ],
  "the-signature-oval-ring": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-signature-oval-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-signature-oval-ring-yellow-gold",
        },
      ],
    },
  ],
  "the-nova-brilliant-ring": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-nova-brilliant-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-nova-brilliant-ring-yellow-gold",
        },
      ],
    },
  ],
  "the-nova-brilliant-ring-yellow-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-nova-brilliant-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-nova-brilliant-ring-yellow-gold",
        },
      ],
    },
  ],
  "the-emerald-baguette-ring": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-emerald-baguette-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-emerald-baguette-ring-yellow-gold",
        },
      ],
    },
  ],
  "the-emerald-baguette-ring-yellow-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-emerald-baguette-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-emerald-baguette-ring-yellow-gold",
        },
      ],
    },
  ],
  "the-emerald-eternity-band": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-emerald-eternity-band",
        },
        {
          label: "Yellow Gold",
          handle: "the-emerald-eternity-band-yellow-gold",
        },
        {
          label: "White Gold",
          handle: "the-emerald-eternity-band-white-gold",
        },
      ],
    },
  ],
  "the-emerald-eternity-band-yellow-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-emerald-eternity-band",
        },
        {
          label: "Yellow Gold",
          handle: "the-emerald-eternity-band-yellow-gold",
        },
        {
          label: "White Gold",
          handle: "the-emerald-eternity-band-white-gold",
        },
      ],
    },
  ],
  "the-emerald-eternity-band-white-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-emerald-eternity-band",
        },
        {
          label: "Yellow Gold",
          handle: "the-emerald-eternity-band-yellow-gold",
        },
        {
          label: "White Gold",
          handle: "the-emerald-eternity-band-white-gold",
        },
      ],
    },
  ],
  "the-cushion-cut-ring": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-cushion-cut-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-cushion-cut-ring-yellow-gold",
        },
      ],
    },
  ],
  "the-cushion-cut-ring-yellow-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-cushion-cut-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-cushion-cut-ring-yellow-gold",
        },
        {
          label: "White Gold",
          handle: "the-cushion-cut-ring-white-gold",
        },
      ],
    },
  ],
  "the-cushion-cut-ring-white-gold": [
    {
      label: "Metal",
      options: [
        {
          label: "Platinum",
          handle: "the-cushion-cut-ring",
        },
        {
          label: "Yellow Gold",
          handle: "the-cushion-cut-ring-yellow-gold",
        },
        {
          label: "White Gold",
          handle: "the-cushion-cut-ring-white-gold",
        },
      ],
    },
  ],
};

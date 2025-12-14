"use client";

import clsx from "clsx";
import { Metafield } from "lib/shopify/types";

interface ProductMetafieldsProps {
  metafields?: Metafield[];
  className?: string;
}

export default function ProductMetafields({
  metafields = [],
  className,
}: ProductMetafieldsProps) {
  const caratWeightsMetafield = metafields.find(
    (m) => m?.key === "carat_weights"
  );
  const jewelryMaterialMetafield = metafields.find(
    (m) => m?.key === "jewelry_material"
  );

  // Parse list metafield values (they come as JSON strings)
  const parseListValue = (value: string | null | undefined): string[] => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // If not JSON, treat as single value
      return value ? [value] : [];
    }
  };

  const caratWeights = parseListValue(caratWeightsMetafield?.value);
  const jewelryMaterials = parseListValue(jewelryMaterialMetafield?.value);

  // Combine all values
  const allValues = [...jewelryMaterials, ...caratWeights].filter(
    (v) => v && v.trim() !== ""
  );

  if (allValues.length === 0) {
    return null;
  }

  return (
    <div
      className={clsx(
        "text-sm text-neutral-500 flex items-center gap-1 flex-wrap",
        className
      )}
    >
      {allValues.map((value, index) => (
        <span key={index} className="flex items-center gap-1">
          {value}
          {index < allValues.length - 1 && <span>•</span>}
        </span>
      ))}
    </div>
  );
}

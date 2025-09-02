import {
  getCollection,
  getCollectionProducts,
  getCollections,
} from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import FilterSortWrapper from "components/layout/search/FilterSortWrapper";
import TextHeaderFull from "components/text/TextHeaderFull";
import { defaultSort, sorting } from "lib/constants";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Fetch collection data to get title and description
  const collection = await getCollection(params.collection);
  if (!collection) return notFound();

  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });
  const resultsText = products.length > 1 ? "results" : "result";
  const collections = await getCollections();

  return (
    <FilterSortWrapper
      products={products}
      searchValue={searchValue || ""}
      resultsText={resultsText}
      collections={collections}
    >
      <div className="w-full max-w-[100vw] mx-auto pt-32 md:pt-48 lg:pt-64">
        {collection && (
          <div className="text-center p-8 sm:p-16">
            <TextHeaderFull
              description={collection.description}
              className="text-black"
            >
              {collection.title}
            </TextHeaderFull>
          </div>
        )}

        {/* Filter & Sort Header */}
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="flex items-center space-x-4"></div>
          <button
            id="filter-sort-button"
            className="text-sm text-gray-900 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
          >
            Filter & Sort
          </button>
        </div>

        {products.length === 0 ? (
          <p className="py-3 text-md">{`No products found in this collection`}</p>
        ) : (
          <Grid className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full transition-all duration-500 ease-in-out opacity-100 scale-100">
            <ProductGridItems products={products} />
          </Grid>
        )}
      </div>
    </FilterSortWrapper>
  );
}

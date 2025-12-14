import {
  getCollection,
  getCollectionProducts,
  getCollections,
  getProductsInBothCollections,
} from "lib/shopify";
import { getSubCollections } from "lib/shopify/sub-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import FilterSortWrapper from "components/layout/search/FilterSortWrapper";
import SubCollectionCarousel from "components/layout/search/SubCollectionCarousel";
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
  const {
    sort,
    q: searchValue,
    subCollection,
  } = searchParams as {
    [key: string]: string;
  };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Fetch collection data to get title and description
  const collection = await getCollection(params.collection);
  if (!collection) return notFound();

  // If subCollection is specified, get products that are in both collections
  const products = subCollection
    ? await getProductsInBothCollections({
        mainCollection: params.collection,
        subCollection,
        sortKey,
        reverse,
      })
    : await getCollectionProducts({
        collection: params.collection,
        sortKey,
        reverse,
      });

  const resultsText = products.length > 1 ? "results" : "result";
  const allCollections = await getCollections();

  // Get sub-collections for the current collection
  const subCollectionConfigs = getSubCollections(params.collection);
  const subCollectionHandles = subCollectionConfigs.map((config) =>
    config.handle.toLowerCase()
  );

  // Filter collections to only include sub-collections
  const subCollections = allCollections.filter((collection) =>
    subCollectionHandles.includes(collection.handle.toLowerCase())
  );

  return (
    <FilterSortWrapper
      products={products}
      searchValue={searchValue || ""}
      resultsText={resultsText}
      collections={subCollections}
    >
      <div className="w-full max-w-[100vw] mx-auto pt-48 lg:pt-64">
        {/* Sub-collection carousel - shown above the header */}
        <div className="px-4 sm:px-8">
          <SubCollectionCarousel
            mainCollectionHandle={params.collection}
            collections={allCollections}
          />
        </div>

        {collection && (
          <div className="flex items-center sm:items-end justify-between p-8 px-4 flex-col sm:flex-row gap-2">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <TextHeaderFull className="text-black">
                {collection.title}
              </TextHeaderFull>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                id="filter-sort-button"
                className="flex items-center text-base text-gray-900 hover:text-gray-700 transition-colors duration-200 cursor-pointer font-header"
              >
                Filter & Sort
              </button>
            </div>
          </div>
        )}

        {products.length === 0 ? (
          <p className="py-3 text-md">{`No products found in this collection`}</p>
        ) : (
          <Grid className="grid grid-cols-2 md:grid-cols-3 w-full transition-all duration-500 ease-in-out opacity-100 scale-100">
            <ProductGridItems products={products} />
          </Grid>
        )}
      </div>
    </FilterSortWrapper>
  );
}

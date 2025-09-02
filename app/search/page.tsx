import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import FilterSortWrapper from "components/layout/search/FilterSortWrapper";
import { defaultSort, sorting } from "lib/constants";
import { getCollections, getProducts } from "lib/shopify";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const searchParams = await props.searchParams;
    const { sort, q: searchValue } = searchParams as { [key: string]: string };
    const { sortKey, reverse } =
      sorting.find((item) => item.slug === sort) || defaultSort;

    // Fetch data at the Server Component level
    const [products, collections] = await Promise.all([
      getProducts({ sortKey, reverse, query: searchValue }),
      getCollections(),
    ]);

    const resultsText = products.length > 1 ? "results" : "result";

    return (
      <FilterSortWrapper
        products={products}
        searchValue={searchValue || ""}
        resultsText={resultsText}
        collections={collections}
      >
        <div className="w-full max-w-[100vw] mx-auto pt-32 md:pt-48 lg:pt-64">
          {searchValue ? (
            <p className="mb-4 text-center">
              {products.length === 0
                ? "There are no products that match "
                : `Showing ${products.length} ${resultsText} for `}
              <span className="text-black">&quot;{searchValue}&quot;</span>
            </p>
          ) : (
            <p className="mb-4 text-center">
              <span className="text-black">All products</span>
            </p>
          )}

          {/* Filter & Sort Header */}
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="flex items-center space-x-4"></div>
            <button
              id="filter-sort-button"
              className="text-sm text-gray-900 hover:text-blue-700 transition-colors duration-200 cursor-pointer"
            >
              Filter & Sort
            </button>
          </div>

          {products.length > 0 ? (
            <Grid className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full transition-all duration-500 ease-in-out opacity-100 scale-100">
              <ProductGridItems products={products} />
            </Grid>
          ) : null}
        </div>
      </FilterSortWrapper>
    );
  } catch (error) {
    console.error("Search page error:", error);

    // Return a fallback UI in case of errors
    return (
      <div className="w-full max-w-[100vw] mx-auto pt-32 md:pt-48 lg:pt-64">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Search Error</h1>
          <p className="text-gray-600 mb-4">
            Sorry, there was an error loading the search results.
          </p>
          <a
            href="/search"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Try again
          </a>
        </div>
      </div>
    );
  }
}

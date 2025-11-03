import Grid from "components/grid";
import FilterSortWrapper from "components/layout/search/FilterSortWrapper";

export default function Loading() {
  return (
    <FilterSortWrapper
      products={[]}
      searchValue=""
      resultsText="results"
      collections={[]}
    >
      <div className="w-full max-w-[100vw] mx-auto pt-48 lg:pt-64">
        {/* Search results header skeleton */}
        <div className="mb-4 text-center">
          <div className="h-6 w-48 mx-auto bg-neutral-300 rounded animate-pulse"></div>
        </div>

        {/* Filter & Sort Header */}
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="flex items-center space-x-4"></div>
          <button
            id="filter-sort-button"
            className="text-base text-gray-900 hover:text-blue-700 transition-colors duration-200 cursor-pointer font-header"
          >
            Filter & Sort
          </button>
        </div>

        {/* Product Grid Skeleton */}
        <Grid className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Grid.Item key={index} className="animate-fadeIn">
                <div className="flex-shrink-0 w-full flex flex-col pb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square bg-neutral-300 animate-pulse"></div>
                  </div>
                  <div className="text-center flex flex-col pt-8 pl-1 pr-1">
                    <div className="h-5 w-3/4 mx-auto bg-neutral-300 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-1/2 mx-auto bg-neutral-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </Grid.Item>
            ))}
        </Grid>
      </div>
    </FilterSortWrapper>
  );
}

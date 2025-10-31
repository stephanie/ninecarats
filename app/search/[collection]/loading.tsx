import Grid from "components/grid";
import FilterSortWrapper from "components/layout/search/FilterSortWrapper";
import TextHeaderFull from "components/text/TextHeaderFull";

export default function Loading() {
  return (
    <FilterSortWrapper
      products={[]}
      searchValue=""
      resultsText="results"
      collections={[]}
    >
      <div className="w-full max-w-[100vw] mx-auto pt-48 lg:pt-64">
        {/* TextHeaderFull Skeleton */}
        <div className="text-center p-16">
          <TextHeaderFull description={undefined} className="text-black">
            <div className="h-10 w-64 mx-auto bg-gray-200 rounded animate-pulse"></div>
          </TextHeaderFull>
          <div className="hidden md:flex justify-center mt-4 max-w-2xl mx-auto">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Filter & Sort Header */}
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="flex items-center space-x-4"></div>
          <button
            id="filter-sort-button"
            className="text-base text-gray-900 hover:text-gray-700 transition-colors duration-200 cursor-pointer font-header"
          >
            Filter & Sort
          </button>
        </div>

        {/* Product Grid Skeleton */}
        <Grid className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full transition-all duration-500 ease-in-out opacity-100 scale-100">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Grid.Item key={index} className="animate-fadeIn">
                <div className="flex-shrink-0 w-full flex flex-col pb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-square bg-gray-200 animate-pulse border border-neutral-200"></div>
                  </div>
                  <div className="text-center flex flex-col pt-8 pl-1 pr-1">
                    <div className="h-5 w-3/4 mx-auto bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </Grid.Item>
            ))}
        </Grid>
      </div>
    </FilterSortWrapper>
  );
}

import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full mb-8 sm:mb-16 bg-white">
        <div className="max-w-[100vw] mx-auto flex flex-col items-center">
          {/* <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div> */}
          <div className="relative w-full overflow-hidden px-4 mb-8">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </div>
          {/* <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div> */}
        </div>
      </div>
    </>
  );
}

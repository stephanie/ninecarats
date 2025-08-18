"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search({ onSubmitted }: { onSubmitted?: () => void }) {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="relative mb-8" onSubmit={onSubmitted}>
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="search-input w-full text-md font-light text-gray-900 border-b-1 border-gray-300 pb-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-black transition-colors duration-200"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-gray-400" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative mb-8">
      <input
        type="text"
        placeholder="Search for products..."
        className="search-input w-full text-md font-light text-gray-900 border-b-1 border-gray-300 pb-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-black transition-colors duration-200"
        autoFocus
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-gray-400" />
      </div>
    </form>
  );
}

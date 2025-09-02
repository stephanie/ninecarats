"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search({ onSubmitted }: { onSubmitted?: () => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;

    if (query?.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
      router.push(searchUrl);
      onSubmitted?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8">
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="borderless-input w-full text-md font-light text-gray-900 border-b-1 border-gray-300 pb-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-black transition-colors duration-200 text-sm"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-gray-400" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative mb-8">
      <input
        type="text"
        placeholder="Search for products..."
        className="borderless-input w-full text-md font-light text-gray-900 border-b-1 border-gray-300 pb-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-black transition-colors duration-200 text-sm"
        autoFocus
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-gray-400" />
      </div>
    </form>
  );
}

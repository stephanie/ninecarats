"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Sidebar } from "components/ui/Sidebar";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import Search, { SearchSkeleton } from "./search";

export default function MobileMenu({
  menu,
  textColor,
  onContactClick,
  onCategoriesClick,
}: {
  menu: Menu[];
  textColor: string;
  onContactClick?: () => void;
  onCategoriesClick?: () => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const categories = [
    {
      title: "Engagement rings",
      path: "/search/engagement-rings",
      description: "Timeless engagement rings for your special moment",
    },
    {
      title: "Necklaces",
      path: "/search/necklaces",
      description: "Elegant necklaces and pendants",
    },
    {
      title: "Bracelets",
      path: "/search/bracelets",
      description: "Delicate and bold bracelet designs",
    },
    {
      title: "New arrivals",
      path: "/search?q=new",
      description: "Latest additions to our collection",
    },
    {
      title: "Sale",
      path: "/search?q=sale",
      description: "Special offers and discounted pieces",
    },
  ];

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className={`mr-4 transition-colors duration-300 cursor-pointer p-2 -m-2 ${textColor}`}
        style={{
          touchAction: "manipulation",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          minWidth: "44px",
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="24px"
          height="24px"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          style={{ pointerEvents: "none" }}
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      <Sidebar
        width="w-[100vw]"
        isOpen={isOpen}
        onClose={closeMobileMenu}
        title="Menu"
        position="left"
      >
        <div className="mb-4 w-full">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <nav className="space-y-1">
          {categories.map((category) => (
            <div key={category.path}>
              <Link
                href={category.path}
                onClick={closeMobileMenu}
                className="block py-3 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-700 transition-colors font-header">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors">
                      {category.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors ml-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </nav>

        {/* Additional Links */}
        <div className="pt-6 border-t border-gray-200">
          <div className="space-y-3">
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About us
            </Link>
            <Link
              href="/size-guide"
              onClick={closeMobileMenu}
              className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Size guide
            </Link>
            <button
              onClick={() => {
                closeMobileMenu();
                onContactClick?.();
              }}
              className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact us
            </button>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

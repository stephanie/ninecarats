"use client";

import { Sidebar } from "components/ui/Sidebar";
import Link from "next/link";

interface CategoriesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const categories = [
  {
    title: "Bracelets",
    path: "/search/bracelets",
    description: "Delicate and bold bracelet designs",
  },
  {
    title: "Engagement rings",
    path: "/search/engagement-rings",
    description: "Stunning engagement rings for your special moment",
  },
  {
    title: "Earrings",
    path: "/search/earrings",
    description: "Timeless earrings for day or night",
  },
  {
    title: "Necklaces",
    path: "/search/necklaces",
    description: "Elegant necklaces and pendants",
  },
  {
    title: "Sale",
    path: "/search?q=sale",
    description: "Special offers and discounted pieces",
  },
];

export default function CategoriesSidebar({
  isOpen,
  onClose,
  onContactClick,
}: CategoriesSidebarProps) {
  // Define your categories here - you can replace this with dynamic data from your CMS

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Categories"
      position="left"
      width="w-[400px]"
    >
      <div className="space-y-4 mt-4">
        <div className="text-sm text-gray-500 mb-6">
          Discover our complete collection of fine jewelry and accessories
        </div>

        <nav className="space-y-1">
          {categories.map((category) => (
            <div key={category.path}>
              <Link
                href={category.path}
                onClick={onClose}
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
              onClick={onClose}
              className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              About us
            </Link>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="block text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

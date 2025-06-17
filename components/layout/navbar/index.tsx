import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import { Julius_Sans_One } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";

const { SITE_NAME } = process.env;

const headerFont = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
});

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="relative left-0 right-0 z-50 flex items-center justify-between p-6 lg:px-8">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <button aria-label="Open menu" className="mr-4 text-white">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <div className="flex w-full md:w-1/3">
          <div className="flex items-center gap-2 text-white">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            {/* {searchActive ? (
              <div className="w-32">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>
            ) : (
              <span
                className="text-sm text-neutral-700 cursor-pointer select-none"
                onClick={() => setSearchActive(true)}
              >
                SEARCH
            </span>
            )} */}
          </div>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-white/90 underline-offset-4 hover:text-white hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <span
            className={`text-5xl tracking-wide text-white select-none tracking-wider uppercase`}
          >
            {SITE_NAME}
          </span>
        </div>
        {/* Right Section */}
        <div className="flex justify-end md:w-1/3 gap-6">
          {/* Currency/Location Dropdown */}
          <button className="flex items-center text-sm text-white gap-1">
            (HKD HK$) - HK
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {/* Location Icon */}
          <button aria-label="Location" className="text-white">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
                stroke="currentColor"
                strokeWidth="1.2"
              ></path>
              <path
                d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          {/* Phone Icon */}
          <button aria-label="Phone" className="text-white">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          {/* User Icon */}
          <button aria-label="User" className="text-white">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          {/* Shopping Bag Icon (opens CartModal) */}
          <CartModal />
        </div>
      </div>
    </nav>
  );
}

"use client";
import CartModal from "components/cart/modal";
import { useIsMobile } from "hooks/useIsMobile";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import MobileMenu from "./mobile-menu";

export default function LargeNavHeader({ menu }: { menu: Menu[] }) {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div
        className={`relative flex flex-col justify-center w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur text-black shadow-md py-2"
            : "bg-transparent text-white py-2"
        }`}
      >
        {/* Navbar Content */}
        <div className="relative left-0 right-0 flex justify-between transition-all duration-300 ease-in-out w-full">
          <div
            className={`flex w-full ${
              scrolled && isMobile ? "flex-row-reverse" : "flex-col"
            } md:flex-row`}
          >
            <div
              className={`flex lg:hidden items-center ${
                scrolled
                  ? "justify-start p-2 pr-4"
                  : "justify-between w-full p-4 pt-2"
              }`}
            >
              <Suspense fallback={null}>
                <MobileMenu
                  menu={menu}
                  textColor={scrolled ? "text-black" : "text-white"}
                />
              </Suspense>
              <CartModal textColor={scrolled ? "text-black" : "text-white"} />
            </div>
            <div className="flex justify-start lg:w-1/3 pl-4 md:p-4 items-center md:items-start">
              <button
                aria-label="Open menu"
                className={`mr-4 transition-colors duration-100 hidden lg:flex ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
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
              <div
                className={`flex gap-2 transition-colors duration-100 hidden lg:flex ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                <svg
                  width="24"
                  height="24"
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
                {menu.length ? (
                  <ul className="hidden gap-6 text-sm lg:flex lg:items-center">
                    {menu.map((item: Menu) => (
                      <li key={item.title}>
                        <Link
                          href={item.path}
                          prefetch={true}
                          className={`underline-offset-4 hover:underline transition-colors duration-100 ${scrolled ? "text-black" : "text-white"}`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
            <div
              className={`flex w-full lg:w-1/3 pb-0 items-center ${
                scrolled && isMobile ? "justify-start pl-4" : "justify-center"
              }`}
            >
              {" "}
              <span
                className={`font-header transition-all duration-500 ${
                  scrolled
                    ? "text-base md:text-3xl pt-1 text-black"
                    : "text-[10vw] md:pt-4 text-white"
                } tracking-widest select-none drop-shadow-lg uppercase`}
              >
                NineCarats
              </span>
            </div>
            {/* Right Section */}
            <div className="flex justify-end lg:w-1/3 gap-6 pr-4 md:p-4 items-center md:items-start hidden md:flex">
              {/* Currency/Location Dropdown */}
              {/* <button
                className={`flex text-sm gap-1 transition-colors duration-300 hidden lg:flex ${scrolled ? "text-black" : "text-white"}`}
              >
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
              </button> */}
              {/* Location Icon */}
              {/* <button
                aria-label="Location"
                className={`transition-colors duration-300 hidden lg:flex ${scrolled ? "text-black" : "text-white"}`}
              >
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
              </button> */}
              {/* Phone Icon */}
              <button
                aria-label="Phone"
                className={`transition-colors duration-100 hidden lg:flex ${scrolled ? "text-black" : "text-white"}`}
              >
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
              <button
                aria-label="User"
                className={`transition-colors duration-100 hidden lg:flex ${scrolled ? "text-black" : "text-white"}`}
              >
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
              <CartModal textColor={scrolled ? "text-black" : "text-white"} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

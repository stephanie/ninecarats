"use client";
import { useCart } from "components/cart/cart-context";
import CartSidebar, { cartManager } from "components/cart/cart-sidebar";
import OpenCart from "components/cart/open-cart";
import { useCustomer } from "components/customer/CustomerContext";
import { useIsMobile } from "hooks/useIsMobile";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import ContactSidebar from "./ContactSidebar";
import CustomerLoginSidebar from "./CustomerLoginSidebar";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

export default function LargeNavHeader({ menu }: { menu: Menu[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isContactSidebarOpen, setIsContactSidebarOpen] = useState(false);
  const [isCategoriesSidebarOpen, setIsCategoriesSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { customer, logout } = useCustomer();
  const { cart } = useCart();

  const startWithLargeNav = pathname === "/" || pathname.includes("/search");

  const [forceSmall, setForceSmall] = useState(false);
  const [textColor, setTextColor] = useState("text-white");
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pageTextColor = pathname === "/" ? "text-white" : "text-black";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setForceSmall(!startWithLargeNav);
    // Set initial scrolled state if not on home
    // setScrolled(!startWithLargeNav);
    function onScroll() {
      // Always set scrolled to true if scrolled, but if not on home, keep small size
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [startWithLargeNav]);

  // Update text color when pathname changes
  useEffect(() => {
    setTextColor(pageTextColor);
  }, [pathname]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!searchActive) return;
      const target = event.target as Node;
      if (overlayRef.current && !overlayRef.current.contains(target)) {
        setSearchActive(false);
        resetNav();
      }
    }

    if (searchActive) {
      document.addEventListener("mousedown", handleDocumentClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [searchActive]);

  const getTextColor = (isScrolled: boolean) => {
    return isScrolled || forceSmall ? "text-black" : textColor;
  };

  const resetNav = () => {
    setSearchActive(false);
    setScrolled(window.scrollY > 40);
  };

  const handleUserIconClick = () => {
    if (customer) {
      // If logged in, show user menu or profile
      // For now, just open the sidebar to show user info
      setIsLoginSidebarOpen(true);
    } else {
      // If not logged in, open login sidebar
      setIsLoginSidebarOpen(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div
        className={`relative flex flex-col justify-center w-full transition-all duration-800 ${
          scrolled
            ? "bg-white text-black py-2 sm:py-0"
            : `bg-transparent ${textColor} py-2 sm:py-0`
        }`}
      >
        {/* Navbar Content */}
        <div className="relative left-0 right-0 flex justify-between transition-all duration-300 ease-in-out w-full z-30">
          <div
            className={`flex w-full ${
              scrolled && isMobile ? "flex-row-reverse" : "flex-col"
            } sm:flex-row`}
          >
            <div
              className={`flex sm:hidden items-center ${
                scrolled
                  ? "justify-start p-2 pr-4"
                  : "justify-between w-full px-4 pt-2"
              }`}
            >
              <Suspense fallback={null}>
                <MobileMenu
                  menu={menu}
                  textColor={scrolled || forceSmall ? "text-black" : textColor}
                  onContactClick={() => setIsContactSidebarOpen(true)}
                  onCategoriesClick={() => setIsCategoriesSidebarOpen(true)}
                />
              </Suspense>
              {/* Mobile Cart Button */}
              <div className="sm:hidden">
                <button
                  aria-label="Open cart"
                  onClick={() => cartManager.setOpen(true)}
                  className="flex"
                >
                  <OpenCart
                    quantity={cart?.totalQuantity}
                    textColor={
                      scrolled || forceSmall ? "text-black" : textColor
                    }
                  />
                </button>
              </div>
              {/* CartSidebar - always visible, positioned responsively */}
              <CartSidebar
                key="main-cart-sidebar"
                textColor={scrolled || forceSmall ? "text-black" : textColor}
              />
            </div>
            <div className="flex justify-start sm:w-1/3 pl-4 sm:p-4 items-center sm:items-start">
              <button
                aria-label="Open menu"
                onClick={() => setIsCategoriesSidebarOpen(true)}
                className={`mr-4 transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled || forceSmall)}`}
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
                className={`flex gap-2 transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled || forceSmall)}`}
              >
                <span
                  className="text-sm cursor-pointer select-none"
                  onClick={() => {
                    setSearchActive(true);
                    setScrolled(true);
                  }}
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
                </span>
              </div>
            </div>
            <div
              className={`flex w-full sm:w-1/3 pb-0 items-center ${
                scrolled && isMobile ? "justify-start pl-4" : "justify-center"
              }`}
            >
              <Link
                href="/"
                className={`font-body transition-all duration-500 ${
                  !startWithLargeNav && !scrolled && isMobile
                    ? "text-lg text-black"
                    : scrolled || !startWithLargeNav
                      ? "text-sm sm:text-lg pt-1 text-black"
                      : `text-[5vw] sm:pt-8 ${textColor}`
                } tracking-[.1em] select-none uppercase font-header whitespace-nowrap`}
              >
                Nine Carats
              </Link>
            </div>
            {/* Right Section */}
            <div className="flex justify-end sm:w-1/3 gap-6 pr-4 sm:p-4 items-center sm:items-start hidden sm:flex">
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
                onClick={() => setIsContactSidebarOpen(true)}
                className={`transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled || forceSmall)}`}
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
                aria-label="user icon"
                onClick={handleUserIconClick}
                className={`transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled || forceSmall)}`}
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
              {/* Desktop Cart Button */}
              <button
                aria-label="Open cart"
                onClick={() => cartManager.setOpen(true)}
                className="flex"
              >
                <OpenCart
                  quantity={cart?.totalQuantity}
                  textColor={getTextColor(scrolled || forceSmall)}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop to capture outside clicks */}
        {searchActive && (
          <div className="fixed inset-0 z-10" aria-hidden="true"></div>
        )}

        {/* Search Overlay Section */}
        {mounted && (
          <div
            className={`fixed left-0 w-full bg-white shadow-lg z-20 transition-all duration-500 ease-in-out ${
              searchActive ? "top-14" : "-top-full"
            }`}
          >
            <div
              ref={overlayRef}
              className="w-full max-w-6xl mx-auto px-8 py-8"
            >
              <div className="flex justify-between items-start">
                {/* Left Section - Search Input and Popular */}
                <div className="flex-1 max-w-lg">
                  {/* Search Input */}
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search
                      onSubmitted={() => {
                        setSearchActive(false);
                        setScrolled(false);
                      }}
                    />
                  </Suspense>

                  {/* Popular Section */}
                  <div>
                    <h3 className="text-xl text-black mb-4 font-header">
                      Trending
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "gifts",
                        "necklaces",
                        "bracelets",
                        "rings",
                        "earrings",
                      ].map((term) => (
                        <button
                          key={term}
                          className="px-4 py-2 bg-gray-100 text-black text-sm hover:bg-gray-200 transition-colors duration-200 rounded"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Section - Discover */}
                <div className="ml-16">
                  <h3 className="mb-4 text-gray-500">Discover</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/collections/jewelry"
                        className="text-black hover:text-gray-600 transition-colors duration-200 font-header text-xl"
                      >
                        Jewelry
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collections/gifts"
                        className="text-black hover:text-gray-600 transition-colors duration-200 font-header text-xl"
                      >
                        Gifts
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => resetNav()}
                  className="ml-8 text-black hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                  aria-label="Close search"
                >
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Login Sidebar */}
        <CustomerLoginSidebar
          isOpen={isLoginSidebarOpen}
          onClose={() => setIsLoginSidebarOpen(false)}
        />

        {/* Contact Sidebar */}
        <ContactSidebar
          isOpen={isContactSidebarOpen}
          onClose={() => setIsContactSidebarOpen(false)}
        />

        {/* Categories Sidebar */}
        <CategoriesSidebar
          isOpen={isCategoriesSidebarOpen}
          onClose={() => setIsCategoriesSidebarOpen(false)}
          onContactClick={() => setIsContactSidebarOpen(true)}
        />
      </div>
    </header>
  );
}

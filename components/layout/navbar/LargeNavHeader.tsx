"use client";
import CartSidebar from "components/cart/cart-sidebar";
import { useCustomer } from "components/customer/CustomerContext";
import { useIsMobile } from "hooks/useIsMobile";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import CartIcon from "./CartIcon";
import CategoriesSidebar from "./CategoriesSidebar";
import ContactSidebar from "./ContactSidebar";
import CustomerLoginSidebar from "./CustomerLoginSidebar";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

export default function LargeNavHeader({ menu }: { menu: Menu[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [topBarClosed, setTopBarClosed] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isContactSidebarOpen, setIsContactSidebarOpen] = useState(false);
  const [isCategoriesSidebarOpen, setIsCategoriesSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { customer, logout } = useCustomer();

  const startWithLargeNav = pathname === "/" || pathname.includes("/search");

  const [forceSmall, setForceSmall] = useState(false);
  const [textColor, setTextColor] = useState("text-white");
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pageTextColor =
    pathname === "/" ||
    pathname.includes("/about") ||
    pathname.includes("/our-diamonds")
      ? "text-white"
      : "text-black";

  useEffect(() => {
    setForceSmall(!startWithLargeNav);
  }, [startWithLargeNav]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    if (typeof window !== "undefined") {
      // Check initial scroll position
      handleScroll();

      // Add scroll listener
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

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
    return isScrolled ? "text-black" : textColor;
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
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        !topBarClosed && !scrolled ? "top-14 sm:top-11" : "top-0"
      }`}
    >
      {/* Announcement Top Bar */}
      {!topBarClosed && (
        <div
          className={`fixed top-0 left-0 w-full bg-primary text-white text-xs sm:text-sm flex justify-between px-4 h-14 sm:h-11 transition-transform duration-300 ${
            scrolled ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="w-full flex items-center justify-start sm:justify-center">
            <p className="opacity-90">
              Enjoy complimentary next day delivery and gift wrapping on all
              orders.{" "}
              <Link href="/search/all-products" className="underline">
                Shop now
              </Link>
            </p>
          </div>
          <button
            aria-label="Close announcement"
            onClick={() => setTopBarClosed(true)}
            className="ml-auto cursor-pointer opacity-70 hover:opacity-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
      <div
        className={`relative flex flex-col justify-center w-full transition-all duration-300 ${
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
                  textColor={getTextColor(scrolled)}
                  onContactClick={() => setIsContactSidebarOpen(true)}
                  onCategoriesClick={() => setIsCategoriesSidebarOpen(true)}
                />
              </Suspense>
              {/* Mobile Cart Button */}
              <div className="sm:hidden flex gap-4">
                <button
                  aria-label="user icon"
                  onClick={handleUserIconClick}
                  className={`transition-colors duration-100 sm:flex p-2 -m-2 ${getTextColor(scrolled)}`}
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
                    strokeWidth="1.2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="currentColor"
                    style={{ pointerEvents: "none" }}
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
                <Suspense
                  fallback={
                    <button
                      aria-label="Open cart"
                      className="flex p-2 -m-2"
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
                      <div className={`h-6 w-6 ${getTextColor(scrolled)}`} />
                    </button>
                  }
                >
                  <CartIcon textColor={getTextColor(scrolled)} />
                </Suspense>
              </div>
              {/* CartSidebar - always visible, positioned responsively */}
              <Suspense fallback={null}>
                <CartSidebar
                  key="main-cart-sidebar"
                  textColor={scrolled || forceSmall ? "text-black" : textColor}
                />
              </Suspense>
            </div>
            <div className="flex justify-start sm:w-1/3 pl-4 sm:p-4 items-center sm:items-start">
              <button
                aria-label="Open menu"
                onClick={() => setIsCategoriesSidebarOpen(true)}
                className={`mr-4 transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled)}`}
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
                className={`flex gap-2 transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled)}`}
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
                className={`font-body transition-all duration-300 ${getTextColor(scrolled)} ${
                  !startWithLargeNav && !scrolled && isMobile
                    ? "text-lg"
                    : scrolled || !startWithLargeNav
                      ? "text-base sm:text-lg pt-1"
                      : "text-[8vw] sm:text-[5vw] pt-4 sm:pt-8"
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
                className={`transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled)}`}
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
                className={`transition-colors duration-100 hidden sm:flex ${getTextColor(scrolled)}`}
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
              <Suspense
                fallback={
                  <button aria-label="Open cart" className="flex">
                    <div className={`h-6 w-6 ${getTextColor(scrolled)}`} />
                  </button>
                }
              >
                <CartIcon textColor={getTextColor(scrolled)} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Backdrop to capture outside clicks */}
        {searchActive && (
          <div className="fixed inset-0 z-10" aria-hidden="true"></div>
        )}

        {/* Search Overlay Section */}
        <div
          className={`fixed left-0 w-full bg-white shadow-lg z-20 transition-all duration-500 ease-in-out ${
            searchActive ? "top-14" : "-top-full"
          }`}
        >
          <div ref={overlayRef} className="w-full max-w-6xl mx-auto px-8 py-8">
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
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { title: "necklaces", href: "/search/necklaces" },
                      { title: "bracelets", href: "/search/bracelets" },
                      {
                        title: "engagement rings",
                        href: "/search/rings",
                      },
                      { title: "earrings", href: "/search/earrings" },
                    ].map((term, idx) => (
                      <Link
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-black text-sm hover:bg-gray-200 transition-colors duration-200 rounded"
                        href={term.href}
                        prefetch={true}
                      >
                        {term.title}
                      </Link>
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
                      href="/search/all-products"
                      className="text-black hover:text-gray-600 transition-colors duration-200 font-header text-xl"
                    >
                      All Jewelry
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?q=new"
                      className="text-black hover:text-gray-600 transition-colors duration-200 font-header text-xl"
                    >
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/search?q=sale"
                      className="text-black hover:text-gray-600 transition-colors duration-200 font-header text-xl"
                    >
                      Sale
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

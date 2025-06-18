import { getMenu } from "lib/shopify";
import { Suspense } from "react";
import NavbarClient from "./navbar-client";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <Suspense fallback={<NavbarLoadingSkeleton />}>
      <NavbarClient menu={menu} siteName={SITE_NAME} />
    </Suspense>
  );
}

function NavbarLoadingSkeleton() {
  return (
    <nav className="relative left-0 right-0 z-50 flex items-center justify-between p-6 lg:px-8">
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <div className="h-6 w-20"></div>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <div className="h-12 w-32"></div>
        </div>
        <div className="flex justify-end md:w-1/3 gap-6">
          <div className="h-6 w-20"></div>
          <div className="h-6 w-6"></div>
          <div className="h-6 w-6"></div>
          <div className="h-6 w-6"></div>
          <div className="h-6 w-6"></div>
        </div>
      </div>
    </nav>
  );
}

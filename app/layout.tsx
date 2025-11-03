import { CartProvider } from "components/cart/cart-context";
import { CustomerProvider } from "components/customer/CustomerContext";
import { HelpSystem } from "components/help";
import Footer from "components/layout/Footer";
import { Navbar } from "components/layout/navbar";
import { SignInModalProvider } from "components/layout/SignInModalProvider";
import PageLoader from "components/PageLoader";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Bellefair, Jost } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const { SITE_NAME } = process.env;

// Configure Google Fonts
const jost = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

const bellefair = Bellefair({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bellefair",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  // Cache the cart promise to prevent repeated fetches
  const cart = getCart();

  return (
    <html lang="en">
      <body
        className={`${jost.variable} ${bellefair.variable} font-body bg-white text-black loading`}
      >
        {/* Blocking script to hide content immediately - prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-loading','true');`,
          }}
        />
        <PageLoader />
        <CartProvider cartPromise={cart}>
          <CustomerProvider>
            <SignInModalProvider>
              <Navbar />
              <main>{children}</main>
              <HelpSystem />
            </SignInModalProvider>
          </CustomerProvider>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}

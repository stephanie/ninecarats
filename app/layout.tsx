import { CartProvider } from "components/cart/cart-context";
import { CustomerProvider } from "components/customer/CustomerContext";
import { HelpSystem } from "components/help";
import Footer from "components/layout/Footer";
import { Navbar } from "components/layout/navbar";
import { SignInModalProvider } from "components/layout/SignInModalProvider";
import PageLoader from "components/PageLoader";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import { Bellefair, Jost } from "next/font/google";
import { ReactNode, Suspense } from "react";
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

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nine Carats | Sustainable Luxury Diamond Jewelry",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Nine Carats is pioneering sustainable diamond jewelry with exceptional craftsmanship, bringing you made-to-order heirlooms that will last a lifetime.",
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: SITE_NAME!,
    title: "Nine Carats | Sustainable Luxury Diamond Jewelry",
    description:
      "Nine Carats is pioneering sustainable diamond jewelry with exceptional craftsmanship, bringing you made-to-order heirlooms that will last a lifetime.",
    images: [
      {
        url: "/images/nine-carats-social-share-2.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME!,
      },
    ],
    ...(process.env.FACEBOOK_APP_ID && {
      appId: process.env.FACEBOOK_APP_ID,
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Nine Carats | Sustainable Luxury Diamond Jewelry",
    description:
      "Nine Carats is pioneering sustainable diamond jewelry with exceptional craftsmanship, bringing you made-to-order heirlooms that will last a lifetime.",
    images: ["/images/nine-carats-social-share-2.png"],
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
    <html lang="en" className={`${jost.variable} ${bellefair.variable}`}>
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
        <Suspense fallback={null}>
          <CartProvider cartPromise={cart}>
            <Suspense fallback={null}>
              <CustomerProvider>
                <SignInModalProvider>
                  <Navbar />
                  <main>{children}</main>
                  <HelpSystem />
                </SignInModalProvider>
              </CustomerProvider>
            </Suspense>
          </CartProvider>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}

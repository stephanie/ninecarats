import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Jost } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const { SITE_NAME } = process.env;

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

const bodyFont = Jost({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={bodyFont.className}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className="pt-[120px]">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

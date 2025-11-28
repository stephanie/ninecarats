import { AddToCart } from "components/cart/add-to-cart";
import { GridTileImage } from "components/grid/tile";
import Price from "components/price";
import { Gallery } from "components/product/gallery";
import { MobileVariantSelector } from "components/product/MobileVariantSelector";
import { ProductProvider } from "components/product/product-context";
import { ProductDescription } from "components/product/product-description";
import RelatedProductsSlider from "components/product/RelatedProductsSlider";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import {
  getProduct,
  getProductMedia,
  getProductRecommendations,
} from "lib/shopify";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  // Fetch media data separately to avoid GraphQL errors
  const media = await getProductMedia(params.handle);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  const backgroundColorMapping = {
    default: "bg-neutral-100",
    "Evermore Trilogy": "bg-[#FDFDFD]",
  };

  const getBackgroundColor = () => {
    // Check if pathname contains any of the keys in backgroundColorMapping
    for (const [key, color] of Object.entries(backgroundColorMapping)) {
      console.log(key, product.title);
      if (key !== "default" && product.title.includes(key)) {
        console.log(color, "match!!!");
        return color;
      }
    }
    // Return default background color if no match found
    return backgroundColorMapping.default;
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="w-full flex flex-col gap-4">
        {/* Full width gallery section */}
        <div className="w-full border-b border-neutral-200 pt-[var(--navbar-height-mobile)] sm:pt-[var(--navbar-height-desktop)]">
          <Suspense fallback={<div className="relative w-full" />}>
            <Gallery
              backgroundColor={getBackgroundColor()}
              images={product.images.slice(0, 1).map((image) => ({
                src: image.url,
                altText: image.altText,
              }))}
              media={media}
            />
          </Suspense>
          <div className="lg:hidden w-full flex-row justify-center">
            <div className="flex flex-col p-4">
              <Suspense fallback={null}>
                <h2 className="text-xl text-black mb-2 font-header">
                  {product.title}
                </h2>
                <div className="text-sm text-neutral-500">
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={
                      product.priceRange.maxVariantPrice.currencyCode
                    }
                  />
                </div>
              </Suspense>
            </div>
            <AddToCart product={product} />
            <div className="flex flex-col">
              <MobileVariantSelector
                options={product.options}
                variants={product.variants}
              />
            </div>
          </div>
        </div>
        {/* Product details section */}
        <div className="flex w-full lg:px-6">
          <div className="basis-full">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
        <section className="w-full bg-white p-4">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto`}
          >
            {product.images.slice(1, 3).map((image, idx) => (
              <div
                key={idx}
                className="relative w-full md:min-h-[90vh] min-h-[50vh] flex items-stretch overflow-visible"
              >
                <Image
                  src={image.url}
                  alt={image.altText}
                  style={{
                    objectFit: "contain",
                  }}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </section>
        <div className="w-full text-center text-lg sm:text-xl pt-14 pb-2 font-header">
          You may also like
        </div>
        <RelatedProductsSlider currentProduct={product} maxProducts={6} />
        {/* <RelatedProducts id={product.id} /> */}
        {/* Breadcrumb section */}
        <div className="w-full pb-6 sm:pl-14 pl-4">
          <nav className="text-sm text-neutral-700" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex gap-1">
              <li className="flex items-center">
                <span>Jewelery</span>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link
                  href="/search/bracelets"
                  className="hover:underline underline cursor-pointer"
                >
                  Bracelets
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product, index) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                index={index}
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                isLast={index === relatedProducts.length - 1}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/shopify/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product, index) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link href={`/product/${product.handle}`} prefetch={true}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              src={product.featuredImage?.url}
              index={index}
              productHandle={product.handle}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}

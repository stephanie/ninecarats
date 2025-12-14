import FullScreenSlider from "components/home/FullScreenSlider";
import FullWidthTextSection from "components/home/FullWidthTextSection";
import MultiImageSection from "components/home/MultiImageSection";
import ShopifyProductSlider from "components/home/ShopifyProductSlider";

export const metadata = {
  description:
    "Nine Carats is pioneering sustainable diamond jewelry with exceptional craftsmanship, bringing you made-to-order heirlooms that will last a lifetime.",
  openGraph: {
    type: "website",
  },
};

const multiImageCards = [
  {
    image: "/images/tennis-bracelet-branch2.png",
    imageClassName: "object-cover object-center",
    tagline: "Day Jewelry",
    heading: "The Signature Tennis Bracelet",
    buttonText: "Shop now",
    link: "/product/the-signature-tennis-bracelet",
  },
  {
    image: "/images/model-emerald-jewelry.png",
    tagline: "Wedding",
    heading: "The Emerald Baguette Ring",
    buttonText: "Shop now",
    link: "/search/rings",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="relative w-full">
        <FullScreenSlider />
      </div>
      <ShopifyProductSlider collectionHandle="rings" tagline="Wedding" />
      <FullWidthTextSection />
      <ShopifyProductSlider collectionHandle="bracelets" tagline="Jewelry" />
      {/* <div
        className="relative z-10"
        style={{ transform: "translateY(-100px)" }}
      >
        <TwoColumnFeature
          products={products}
          rightImage="/images/diamonds.avif"
          rightImageAlt="Model wearing jewelry"
        />
      </div> */}
      <MultiImageSection cards={multiImageCards} columns={2} />
      <ShopifyProductSlider collectionHandle="earrings" tagline="Jewelry" />
      {/* <StickyTextImageSection
        tagline="Wedding"
        heading="Our Engagement Rings"
        image="/images/engagement-ring-model.avif"
        button={
          <ButtonLink
            href="/search/rings"
            className="text-white border-white hover:border-gray-200"
          >
            Shop our collection
          </ButtonLink>
        }
      /> */}
      {/* <StickyTextImageSection
        tagline="About us"
        heading="Our Diamonds"
        video="/videos/diamond-rotating.mp4"
        videoClassName="bg-black max-h-[40vh]"
        minHeight="min-h-[75vh]"
        button={
          <ButtonLink
            href="/our-diamonds"
            className="text-white border-white hover:border-gray-200"
          >
            Why we only use the highest grade diamonds
          </ButtonLink>
        }
      /> */}
      <ShopifyProductSlider collectionHandle="necklaces" tagline="Jewelry" />
    </>
  );
}

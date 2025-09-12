import FullScreenSlider from "components/home/FullScreenSlider";
import FullWidthTextSection from "components/home/FullWidthTextSection";
import MultiImageSection from "components/home/MultiImageSection";
import ShopifyProductSlider from "components/home/ShopifyProductSlider";
import StickyTextImageSection from "components/home/StickyTextImageSection";
import ButtonLink from "components/text/ButtonLink";

export const metadata = {
  description: "Luxury jewelry and engagement rings.",
  openGraph: {
    type: "website",
  },
};

const cards = [
  {
    image: "/images/engagement-rings.webp",
    heading: "High Summer",
    buttonText: "Shop now",
    link: "#",
  },
  {
    image: "/images/earrings.webp",
    heading: "Earrings",
    buttonText: "Shop now",
    link: "#",
  },
  {
    image: "/images/diamonds.avif",
    heading: "Diamonds",
    buttonText: "Learn more",
    link: "#",
  },
];

const cards2 = [
  {
    image: "/images/engagement-rings.webp",
    heading: "Visit us",
    buttonText: "Book an appointment",
    link: "#",
  },
  {
    image: "/images/diamonds.avif",
    heading: "Our diamonds",
    buttonText: "Why we only use the highest grade diamonds",
    link: "#",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="relative w-full">
        <FullScreenSlider />
      </div>
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
      <FullWidthTextSection />
      <ShopifyProductSlider
        collectionHandle="engagement-rings"
        tagline="Wedding"
      />
      <StickyTextImageSection
        tagline="Day Jewelry"
        heading="Necklaces"
        image="/images/full-width-jewelry.webp"
        button={
          <ButtonLink
            href="/search/necklaces"
            className="text-white hover:border-white"
          >
            Shop our collection
          </ButtonLink>
        }
      />
      <ShopifyProductSlider collectionHandle="necklaces" tagline="Jewelry" />
      <ShopifyProductSlider collectionHandle="earrings" tagline="Jewelry" />
      <MultiImageSection cards={cards2} columns={2} />
    </>
  );
}

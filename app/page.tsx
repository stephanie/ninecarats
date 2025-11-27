import FullScreenSlider from "components/home/FullScreenSlider";
import FullWidthTextSection from "components/home/FullWidthTextSection";
import MultiImageSection from "components/home/MultiImageSection";
import ShopifyProductSlider from "components/home/ShopifyProductSlider";
import StickyTextImageSection from "components/home/StickyTextImageSection";
import ButtonLink from "components/text/ButtonLink";

export const metadata = {
  description:
    "Nine Carats is pioneering sustainable diamond jewelry with exceptional craftsmanship, bringing you made-to-order heirlooms that will last a lifetime.",
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
    image: "/images/round-tennis-bracelet-hand.avif",
    heading: "Get in touch",
    buttonText: "Contact our team",
    link: "https://api.whatsapp.com/send/?phone=85298611934&text&type=phone_number&app_absent=0",
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
      <ShopifyProductSlider collectionHandle="earrings" tagline="Jewelry" />
      <StickyTextImageSection
        tagline="Wedding"
        heading="Engagement Rings"
        image="/images/engagement-ring2.avif"
        button={
          <ButtonLink
            href="/search/engagement-rings"
            className="text-white border-white hover:border-gray-200"
          >
            Shop our collection
          </ButtonLink>
        }
      />
      <ShopifyProductSlider collectionHandle="necklaces" tagline="Jewelry" />
      <MultiImageSection cards={cards2} columns={2} />
    </>
  );
}

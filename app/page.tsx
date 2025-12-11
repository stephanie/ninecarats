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
    image: "/images/emerald-tennis-bracelet-model.avif",
    heading: "Contact us",
    buttonText: "Chat to our team",
    link: "https://api.whatsapp.com/send/?phone=85298611934&text&type=phone_number&app_absent=0",
  },
  {
    video: "/videos/diamond-rotating.mp4",
    heading: "Our diamonds",
    videoClassName: "bg-black",
    buttonText: "Why we only use the highest grade diamonds",
    link: "/our-diamonds",
  },
];

const cards3 = [
  {
    image: "/images/tennis-bracelet-branch2.png",
    imageClassName: "object-cover object-center",
    tagline: "Day Jewelry",
    heading: "The Emerald Tennis Bracelet",
    buttonText: "Shop our collection",
    link: "/search/bracelets",
  },
  {
    image: "/images/model-emerald-jewelry.png",
    tagline: "Wedding",
    heading: "The Emerald Eternity Band",
    buttonText: "Shop our collection",
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
      <MultiImageSection cards={cards3} columns={2} />
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
      {/* <ShopifyProductSlider collectionHandle="necklaces" tagline="Jewelry" /> */}
    </>
  );
}

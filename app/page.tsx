import FullScreenSlider from "components/home/FullScreenSlider";
import FullWidthProductSlider from "components/home/FullWidthProductSlider";
import FullWidthTextSection from "components/home/FullWidthTextSection";
import StickyTextImageSection from "components/home/StickyTextImageSection";
import ThreeImageSection from "components/home/ThreeImageSection";
import ButtonLink from "components/text/ButtonLink";

export const metadata = {
  description: "Luxury jewelry and engagement rings.",
  openGraph: {
    type: "website",
  },
};

const sliderProducts1 = [
  {
    name: "Classic Tennis Bracelet 1",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 2",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 3",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 4",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 5",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 6",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 7",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
  {
    name: "Classic Tennis Bracelet 8",
    price: "$3,500",
    image: "/images/bracelet.webp",
  },
];

const sliderProducts2 = [
  {
    name: "Emerald Cut Ring 1",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
  {
    name: "Emerald Cut Ring 2",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
  {
    name: "Emerald Cut Ring 3",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
  {
    name: "Emerald Cut Ring 4",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
  {
    name: "Emerald Cut Ring 5",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
  {
    name: "Emerald Cut Ring 6",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
  {
    name: "Emerald Cut Ring 7",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
  {
    name: "Emerald Cut Ring 8",
    price: "$3,500",
    image: "/images/ring-2-transparent.webp",
  },
];

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
    image: "/images/earrings.webp",
    heading: "Sustainable luxury",
    buttonText: "Learn about our values",
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
      <ThreeImageSection cards={cards} />
      <FullWidthProductSlider
        products={sliderProducts1}
        tagline="Day Jewelry"
        heading="Bracelets"
        sectionDescription="Juxtaposed in elegant combinations, these fine bracelets offer a wide variety of forms to embellish the wrist."
      />
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
      <FullWidthProductSlider
        products={sliderProducts1}
        tagline="Day Jewelry"
        heading="Bracelets"
        sectionDescription="Juxtaposed in elegant combinations, these fine bracelets offer a wide variety of forms to embellish the wrist."
      />
      <StickyTextImageSection
        tagline="Day Jewelry"
        heading="Necklaces"
        image="/images/full-width-jewelry.webp"
        button={
          <ButtonLink href="#" className="text-white hover:border-white">
            Explore all
          </ButtonLink>
        }
      />
      <FullWidthProductSlider
        products={sliderProducts2}
        tagline="Day Jewelry"
        heading="Rings"
        sectionDescription="Juxtaposed in elegant combinations, these fine rings offer a wide variety of forms to embellish the hand."
      />
      <ThreeImageSection cards={cards2} />
    </>
  );
}

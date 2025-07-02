import FullScreenSlider from "components/home/FullScreenSlider";
import FullWidthProductSlider from "components/home/FullWidthProductSlider";
import FullWidthTextSection from "components/home/FullWidthTextSection";
import StickyTextImageSection from "components/home/StickyTextImageSection";
import TwoColumnFeature from "components/home/TwoColumnFeature";
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

export default function HomePage() {
  const products = [
    {
      productImage: "/images/bracelet.webp",
      productName: "Signature tennis bracelet",
      material: "18k gold, 12ct",
      price: "$3,500",
      buttonText: "Explore our signature collection",
      buttonLink: "#",
    },
    {
      productImage: "/images/bracelet.webp",
      productName: "Diamond engagement ring",
      material: "Platinum, 2.5ct",
      price: "$8,500",
      buttonText: "View engagement rings",
      buttonLink: "#",
    },
    {
      productImage: "/images/bracelet.webp",
      productName: "Classic tennis bracelet",
      material: "White gold, 8ct",
      price: "$4,200",
      buttonText: "Shop tennis bracelets",
      buttonLink: "#",
    },
    {
      productImage: "/images/bracelet.webp",
      productName: "Sapphire ring",
      material: "Yellow gold, 3ct",
      price: "$6,800",
      buttonText: "Discover colored stones",
      buttonLink: "#",
    },
    {
      productImage: "/images/bracelet.webp",
      productName: "Eternity band",
      material: "Rose gold, 1.5ct",
      price: "$2,900",
      buttonText: "Explore eternity bands",
      buttonLink: "#",
    },
  ];

  return (
    <>
      <div className="relative w-full">
        <FullScreenSlider />
      </div>
      <div
        className="relative z-10"
        style={{ transform: "translateY(-100px)" }}
      >
        <TwoColumnFeature
          products={products}
          rightImage="/images/diamonds.avif"
          rightImageAlt="Model wearing jewelry"
        />
      </div>
      <div
        className="relative z-10"
        style={{ transform: "translateY(-100px)" }}
      >
        <FullWidthTextSection />
      </div>
      <div
        className="relative z-10"
        style={{ transform: "translateY(-100px)" }}
      >
        <FullWidthProductSlider
          products={sliderProducts1}
          tagline="Day Jewelry"
          heading="Bracelets"
          sectionDescription="These fine bracelets offer a wide variety of forms to embellish the wrist. Juxtaposed in elegant combinations, they create a wealth of delicate possibilities."
        />
      </div>
      <div
        className="relative z-10"
        style={{ transform: "translateY(-100px)" }}
      >
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
      </div>
      <div
        className="relative z-10"
        style={{ transform: "translateY(-100px)" }}
      >
        <FullWidthProductSlider
          products={sliderProducts2}
          tagline="Day Jewelry"
          heading="Rings"
          sectionDescription="These fine rings offer a wide variety of forms to embellish the hand. Juxtaposed in elegant combinations, they create a wealth of delicate possibilities."
        />
      </div>
    </>
  );
}

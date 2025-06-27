import FullScreenSlider from "components/home/FullScreenSlider";
import FullWidthProductSlider from "components/home/FullWidthProductSlider";
import FullWidthTextSection from "components/home/FullWidthTextSection";
import TwoColumnFeature from "components/home/TwoColumnFeature";

export const metadata = {
  description: "Luxury jewelry and engagement rings.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  const products = [
    {
      productImage: "/images/bracelet.webp",
      productName: "Signature tennis bracelet",
      material: "18k gold, 12ct",
      price: "$3,500",
      buttonText: "Explore bracelets",
      buttonLink: "#",
    },
    {
      productImage: "/images/bracelet.webp",
      productName: "Diamond engagement ring",
      material: "Platinum, 2.5ct",
      price: "$8,500",
      buttonText: "Explore engagement rings",
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
        <FullWidthProductSlider />
      </div>
    </>
  );
}

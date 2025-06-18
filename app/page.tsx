import FullScreenSlider from "components/home/FullScreenSlider";
import FullWidthTextSection from "components/home/FullWidthTextSection";
import TwoColumnFeature from "components/home/TwoColumnFeature";

export const metadata = {
  description: "Luxury jewelry and engagement rings.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
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
          productImage="/images/bracelet.webp"
          productName="Signature tennis bracelet"
          material="18k gold, 12ct"
          price="$3,500"
          sliderIndex={0}
          sliderTotal={5}
          buttonText="Explore our classics"
          buttonLink="#"
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
    </>
  );
}

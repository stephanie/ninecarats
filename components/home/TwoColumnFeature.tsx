import Image from "next/image";

interface TwoColumnFeatureProps {
  productImage: string;
  productName: string;
  material: string;
  price: string;
  sliderIndex: number;
  sliderTotal: number;
  buttonText: string;
  buttonLink: string;
  rightImage: string;
  rightImageAlt?: string;
}

export default function TwoColumnFeature({
  productImage,
  productName,
  material,
  price,
  sliderIndex,
  sliderTotal,
  buttonText,
  buttonLink,
  rightImage,
  rightImageAlt,
}: TwoColumnFeatureProps) {
  return (
    <section className="w-full flex flex-col md:flex-row min-h-[100vh]">
      {/* Left: Product Info */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 bg-white gap-2">
        <div className="mb-8">
          <Image
            src={productImage}
            alt={productName}
            width={220}
            height={220}
            className="mx-auto object-contain"
          />
        </div>
        <h2 className="text-lg md:text-xl text-center mb-2">{productName}</h2>
        <div className="text-sm text-neutral-500 text-center mb-1">
          {material}
        </div>
        <div className="text-base text-neutral-700 text-center mb-6">
          {price}
        </div>
        {/* Slider dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: sliderTotal }).map((_, i) => (
            <span
              key={i}
              className={`block h-2 w-2 rounded-full ${i === sliderIndex ? "bg-neutral-800" : "bg-neutral-300"}`}
            />
          ))}
        </div>
        <a
          href={buttonLink}
          className="mt-2 px-4 py-2 border-b border-neutral-400 text-neutral-800 text-sm tracking-wide hover:border-black transition"
        >
          {buttonText}
        </a>
      </div>
      {/* Right: Model Image */}
      <div className="flex-1 min-h-[320px] relative">
        <Image
          src={rightImage}
          alt={rightImageAlt || "Some alt text"}
          fill
          className="object-cover object-center md:rounded-none rounded-b-2xl"
          priority
        />
      </div>
    </section>
  );
}

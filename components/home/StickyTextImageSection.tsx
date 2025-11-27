import TextHeaderFull from "components/text/TextHeaderFull";
import Image from "next/image";

interface StickyTextImageSectionProps {
  tagline: string;
  heading: React.ReactNode;
  button?: React.ReactNode;
  image: string;
  imageAlt?: string;
}

export default function StickyTextImageSection({
  tagline,
  heading,
  button,
  image,
  imageAlt = "",
}: StickyTextImageSectionProps) {
  return (
    <section className="relative w-full min-h-[100vh] flex items-stretch overflow-visible">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center bg-white"
          priority
        />
      </div>
      {/* Sticky Text */}
      <div className="w-full max-w-xl">
        <div className="sticky top-8 md:top-16 pt-10 md:pt-16 z-10 pl-6 md:pl-12 pb-12 md:pb-16">
          <TextHeaderFull
            tagline={tagline}
            button={button}
            align="left"
            className="text-white"
          >
            {heading}
          </TextHeaderFull>
        </div>
      </div>
    </section>
  );
}

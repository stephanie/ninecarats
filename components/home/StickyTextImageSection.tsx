import TextHeaderFull from "components/text/TextHeaderFull";
import Image from "next/image";

interface StickyTextImageSectionProps {
  tagline?: string;
  heading: React.ReactNode;
  button?: React.ReactNode;
  image?: string;
  video?: string;
  videoClassName?: string;
  imageAlt?: string;
  minHeight?: string;
}

export default function StickyTextImageSection({
  tagline,
  heading,
  button,
  image,
  video,
  videoClassName,
  imageAlt = "",
  minHeight = "min-h-[100vh]",
}: StickyTextImageSectionProps) {
  return (
    <section
      className={`relative w-full ${minHeight ? minHeight : "min-h-[100vh]"} flex items-stretch overflow-visible ${video ? videoClassName : ""}`}
    >
      {/* Background Image or Video */}
      <div
        className={`absolute inset-0 w-full h-full ${video ? "flex items-center justify-center" : ""}`}
      >
        {video ? (
          <video
            className={`w-full h-auto object-contain ${videoClassName || ""}`}
            src={video}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={image!}
            alt={imageAlt}
            fill
            className="object-cover object-center bg-white"
            priority
          />
        )}
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

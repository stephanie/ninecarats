import ButtonLink from "components/text/ButtonLink";
import TextHeaderFull from "components/text/TextHeaderFull";
import Image from "next/image";

interface Card {
  image?: string;
  video?: string;
  videoClassName?: string;
  imageClassName?: string;
  heading: string;
  buttonText: string;
  link: string;
  tagline?: string;
}

interface MultiImageSectionProps {
  cards: Card[];
  columns?: number;
}

export default function MultiImageSection({
  cards,
  columns = 3,
}: MultiImageSectionProps) {
  return (
    <section className="w-full bg-white">
      <div
        className={`grid grid-cols-1 md:grid-cols-${columns} w-full mx-auto`}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`relative w-full md:min-h-[90vh] min-h-[70vh] flex items-stretch overflow-visible ${
              card.video ? card.videoClassName : ""
            }`}
          >
            {card.video ? (
              <video
                className={`absolute inset-0 w-full h-full object-contain z-0 ${card.videoClassName}`}
                src={card.video}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={card.image!}
                alt={card.heading}
                fill
                className={`object-cover object-center ${card.imageClassName}`}
                priority={idx === 0}
              />
            )}
            {/* Sticky Text */}
            <div className="w-full max-w-xl">
              <div className="sticky bottom-8 top-12 pt-6 pb-6 px-2 md:p-8 md:top-16">
                <TextHeaderFull
                  className="text-white"
                  align="left"
                  tagline={card.tagline}
                  button={
                    <ButtonLink
                      href={card.link}
                      className="text-white border-white hover:border-gray-200"
                    >
                      {card.buttonText}
                    </ButtonLink>
                  }
                >
                  {card.heading}
                </TextHeaderFull>
              </div>
            </div>
            {/* <div className="absolute bottom-0 left-0 w-full pl-6 pb-12 bg-gradient-to-t from-black/60 to-transparent"></div> */}
          </div>
        ))}
      </div>
    </section>
  );
}

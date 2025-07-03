import ButtonLink from "components/text/ButtonLink";
import TextHeaderFull from "components/text/TextHeaderFull";
import Image from "next/image";

interface Card {
  image: string;
  heading: string;
  buttonText: string;
  link: string;
}

interface ThreeImageSectionProps {
  cards: Card[];
}

export default function ThreeImageSection({ cards }: ThreeImageSectionProps) {
  return (
    <section className="w-full md:pt-4 pb-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative aspect-[3/4] overflow-hidden group"
          >
            <Image
              src={card.image}
              alt={card.heading}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              priority={idx === 0}
            />
            <div className="absolute bottom-0 left-0 w-full pl-6 pb-12 bg-gradient-to-t from-black/60 to-transparent">
              <TextHeaderFull
                className="text-white"
                align="left"
                tagline=""
                button={
                  <ButtonLink
                    href={card.link}
                    className="text-white hover:border-white"
                  >
                    {card.buttonText}
                  </ButtonLink>
                }
              >
                {card.heading}
              </TextHeaderFull>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

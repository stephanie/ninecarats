import ButtonLink from "components/text/ButtonLink";
import TextHeaderFull from "components/text/TextHeaderFull";

export default function FullWidthTextSection() {
  return (
    <section className="relative w-full md:min-h-[60vh] min-h-[320px] bg-white py-24 px-4 overflow-hidden flex flex-col justify-center">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 p-4"
        src="/videos/sky.mov"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Optional overlay for readability */}
      <div className="absolute inset-0 z-0" />
      <div className="relative z-10">
        <TextHeaderFull
          className="text-white"
          headerClassName="text-1xl md:text-4xl"
          tagline="Meet NineCarats"
          button={
            <ButtonLink href="#" className="text-white hover:border-white">
              Read our story
            </ButtonLink>
          }
        >
          We are pioneering
          <br />
          <span className="italic font-normal">
            sustainable diamond jewelry
          </span>
          <br />
          with exceptional craftsmanship
        </TextHeaderFull>
      </div>
    </section>
  );
}

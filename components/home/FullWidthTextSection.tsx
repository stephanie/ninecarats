import ButtonLink from "components/text/ButtonLink";
import CenteredTextSection from "components/text/CenteredTextSection";

export default function FullWidthTextSection() {
  return (
    <section className="w-full bg-black py-24 px-4">
      <CenteredTextSection
        tagline="Meet NINE CARATS"
        button={
          <ButtonLink href="#" className="text-white hover:border-white">
            Read our story
          </ButtonLink>
        }
      >
        We are pioneering
        <br />
        <span className="italic font-normal">sustainable diamond jewelry</span>
        <br />
        with exceptional craftsmanship
      </CenteredTextSection>
    </section>
  );
}

"use client";

import { useViewportHeight } from "hooks/useViewportHeight";

export default function AboutPage() {
  const viewportHeight = useViewportHeight();

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section
        className="relative w-full flex items-end"
        style={{
          height: viewportHeight ? `calc(${viewportHeight}px)` : "calc(100vh)",
        }}
      >
        {/* <Image
          src="/images/full-width-jewelry.webp"
          alt="21st Century Diamond Jewelry Hero"
          fill
          priority
          className="object-cover object-center w-full h-full opacity-90"
          sizes="100vw"
        /> */}
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/sky-b&w.mov"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="z-10 absolute bottom-8 left-0 p-4 sm:p-12 md:p-16 max-w-xl flex flex-col gap-2 pointer-events-none">
          <span className="text-white text-4xl md:text-6xl font-header drop-shadow-xl">
            Meet Nine Carats
          </span>
        </div>
        <div className="absolute inset-0 bg-black opacity-30 pointer-events-none" />
      </section>
      {/* About Section */}
      <section className="w-full bg-white min-h-screen flex flex-col lg:flex-row items-center justify-center gap-0 sm:gap-16 py-16 md:py-28 px-4 md:px-20 text-center">
        {/* Left text */}
        <div className="flex-1 max-w-xl w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-header mb-8">
            We are Nine Carats
          </h2>
          <p className="mb-6 text-base md:text-md text-black">
            Nine Carats, founded in 2025, is a pioneering lab diamond jewelry
            brand. Driven by the passion to bring high-end, sustainable
            jewellery to customers worldwide, we are revolutionizing the fine
            jewelry industry by removing the traditional luxury markup without
            compromising on quality. Our unique creative approach skillfully
            blends decades of traditional handcraftsmanship with cutting-edge
            technological innovation, reflecting the background of our founders
            and setting our brand apart from others. Each of our pieces is
            made-to-order by our expert artisans in our workshop overlooking the
            Hong Kong harbour.
          </p>
          <p className="mb-6 text-base md:text-md text-black">
            Fully committed to eco-conscious production—we are meticulous in
            selecting each and every one of gemstones and metals, using only the
            most exceptional lab-grown, colorless diamonds, and crafting each of
            your pieces individually to combat fast fashion. We are proud to be
            a part of the growing movement towards more sustainable and ethical
            practices in the jewelry industry.
          </p>
          <p className="mb-6 text-base md:text-md text-black">
            Why nine? In numerology, nine is often associated with universal
            love and completion. This meaning is deepened by our roots: in
            Chinese culture, the number nine (九, jiǔ) sounds like the word
            "everlasting", making it the number most associated with eternity.
            For us, this concept of enduring love and permanence perfectly
            captures our diamond jewelry. Our name embodies our promise to
            create timeless jewelry of the highest quality, designed to last you
            a lifetime.
          </p>
        </div>
        {/* Right photo */}
        {/* <div className="flex-1 flex justify-center xs:justify-end w-full mt-12 md:mt-0"> */}
        {/* <div className="relative w-[100vw] sm:w-[50vw] aspect-[4/3] overflow-hidden"> */}
        {/* <Image
              src="/images/two-asian-women.webp"
              alt="Lesley Yu and Stephanie Siaw, the Nine Carats founders"
              fill
              className="object-cover object-center w-full h-full"
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 390px, 480px"
            /> */}
        {/* Caption for photo */}
        {/* <span className="absolute left-4 bottom-4 text-white text-xs md:text-sm drop-shadow-lg z-10">
              Lesley Yu and Stephanie Siaw, the Nine Carats founders
            </span> */}
        {/* </div> */}
        {/* </div> */}
      </section>
    </div>
  );
}

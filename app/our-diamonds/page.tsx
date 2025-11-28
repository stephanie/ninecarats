"use client";

import { useViewportHeight } from "hooks/useViewportHeight";

export default function OurDiamondsPage() {
  const viewportHeight = useViewportHeight();

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section
        className="relative w-full flex items-center justify-center bg-black"
        style={{
          height: viewportHeight ? `calc(${viewportHeight}px)` : "calc(100vh)",
        }}
      >
        {/* Background Video */}
        <video
          className="w-full max-w-4xl h-auto object-contain z-0"
          src="/videos/diamond-rotating.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="z-10 absolute bottom-8 left-0 p-4 sm:p-12 md:p-16 max-w-xl flex flex-col gap-2 pointer-events-none">
          <span className="text-white text-4xl md:text-6xl font-header drop-shadow-xl">
            Our diamonds
          </span>
        </div>
      </section>
      {/* OurDiamonds Section */}
      <section className="w-full bg-white flex flex-col lg:flex-row gap-0 h-full items-center justify-center sm:mt-16 mb-4 sm:mb-16">
        {/* Left text */}
        <div className="flex-1 flex items-center w-full mx-auto mb-8 sm:mb-0 p-0 lg:pl-16">
          <div className="relative max-w-3xl w-full mx-auto">
            <video
              className="w-full h-auto object-contain z-0"
              src="/videos/craftsman-ring.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
        <div className="flex-1 w-full mx-auto p-4 sm:p-12 md:pr-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-header mb-8">
            Our diamonds
          </h2>
          <p className="mb-6 text-base md:text-md text-black">
            At Nine Carats, we are committed to delivering the highest quality
            diamonds that meet the most stringent standards of excellence. We
            believe that exceptional jewelry begins with exceptional gemstones,
            which is why we use only the finest lab-grown diamonds,
            hand-selected for their sparkling brilliance and uncompromising
            quality.
          </p>
          <p className="mb-6 text-base md:text-md text-black">
            Every diamond in our collection meets our rigorous quality
            standards: only lab certified diamonds of VS1 clarity or higher,
            with color grades of DEF for maximum brilliance. Each stone is
            carefully selected by our master gemologists, ensuring that every
            piece of Nine Carats jewelry showcases diamonds of the highest
            caliber.
          </p>
          <p className="text-base md:text-md text-black">
            Our commitment to quality extends beyond the diamond itself. Every
            Nine Carats diamond above 1ct comes with a certificate of
            authenticity and our personal guarantee of quality. We stand behind
            every piece we create, ensuring that your jewelry not only meets but
            exceeds the highest industry standards for brilliance, clarity, and
            lasting beauty.
          </p>
        </div>
      </section>
    </div>
  );
}

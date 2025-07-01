"use client";

import ButtonLink from "components/text/ButtonLink";
import CenteredTextSection from "components/text/CenteredTextSection";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

// Custom hook to handle mobile viewport height
function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      // Get the actual viewport height
      const vh = window.innerHeight;
      setViewportHeight(vh);

      // Set CSS custom property for use in CSS
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set initial height
    updateHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  return viewportHeight;
}

interface Slide {
  type: "image" | "video";
  src: string;
  alt?: string;
  link?: string;
  heading?: string;
  tagline?: string;
  buttonText?: string;
  buttonLink?: string;
}

const slides: Slide[] = [
  {
    type: "image",
    src: "/images/slider/rings3.webp",
    alt: "Engagement Rings",
    link: "/collections/engagement-rings",
    tagline: "Wedding Jewelry",
    heading: "Engagement Rings",
    buttonText: "Explore all",
    buttonLink: "/collections/engagement-rings",
  },
  {
    type: "image",
    src: "/images/slider/heroBanner.webp",
    alt: "Earrings",
    link: "/collections/earrings",
    tagline: "Jewelry",
    heading: "Earrings",
    buttonText: "Explore all",
    buttonLink: "/collections/earrings",
  },
];

const LeftCaret = () => (
  <svg
    width="7"
    height="9"
    viewBox="0 0 7 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 4.05605L7 0V1.25112L1.30055 4.5V4.58072L7 7.7287V9L0 4.96413V4.05605Z"
      fill="currentColor"
    />
  </svg>
);

const RightCaret = () => (
  <svg
    width="7"
    height="9"
    viewBox="0 0 7 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 4.94395L0 9V7.74888L5.69945 4.5L5.69945 4.41928L0 1.2713V0L7 4.03587V4.94395Z"
      fill="currentColor"
    />
  </svg>
);

export default function FullScreenSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(true);
  const viewportHeight = useViewportHeight();

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setHeadingVisible(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setHeadingVisible(true);
    }, 500);
    setProgress(0);
  }, [isTransitioning]);

  const previousSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setHeadingVisible(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setHeadingVisible(true);
    }, 500);
    setProgress(0);
  }, [isTransitioning]);

  useEffect(() => {
    let animationFrameId: number;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 0.1;
        const nextProgress = prev + increment;

        if (nextProgress >= 100) {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }

          animationFrameId = requestAnimationFrame(() => {
            setHeadingVisible(false);
            setTimeout(() => {
              setCurrentSlide((current) => (current + 1) % slides.length);
              setHeadingVisible(true);
            }, 500);
            setIsTransitioning(true);
          });

          return 0;
        }
        return nextProgress;
      });
    }, 20);

    return () => {
      clearInterval(interval);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const currentHeading = slides[currentSlide]!.heading || "";

  return (
    <div
      className="relative w-full"
      style={{
        height: viewportHeight
          ? `calc(${viewportHeight}px - 20px)`
          : "calc(100vh - 20px)",
        transform: "translateY(-100px)",
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.type === "image" ? (
            <Link href={slide.link || "#"}>
              <Image
                src={slide.src}
                alt={slide.alt || ""}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </Link>
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          )}
        </div>
      ))}

      {/* Navigation and Heading */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
        <div className="relative mb-6 flex h-50 w-[25rem] items-center justify-center">
          <div className="absolute left-0 transform text-white transition-transform duration-500 ease-in-out hover:opacity-70">
            <button
              onClick={previousSlide}
              aria-label="Previous slide"
              className="cursor-pointer"
            >
              <LeftCaret />
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <CenteredTextSection
              className={`whitespace-nowrap transition-all duration-500 ${
                headingVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              tagline={slides[currentSlide]!.tagline || ""}
              button={
                <ButtonLink
                  href={slides[currentSlide]!.buttonLink || "#"}
                  className="text-white hover:border-white"
                >
                  {slides[currentSlide]!.buttonText || ""}
                </ButtonLink>
              }
            >
              {currentHeading}
            </CenteredTextSection>
          </div>
          <div className="absolute right-0 transform text-white transition-transform duration-500 ease-in-out hover:opacity-70">
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="cursor-pointer"
            >
              <RightCaret />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-neutral-800">
          <div
            className="h-full bg-white transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

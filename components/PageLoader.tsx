"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState<any>(null);

  // Load the Lottie animation JSON file
  useEffect(() => {
    fetch("/images/Diamond.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error("Failed to load Diamond animation:", err);
      });
  }, []);

  // Wait for the page to fully load
  useEffect(() => {
    // Make body visible once React has hydrated
    document.documentElement.removeAttribute("data-loading");

    const restoreScroll = () => {
      setIsLoading(false);
      document.body.classList.remove("loading");
    };

    const handleLoad = () => {
      setTimeout(restoreScroll, 300);
    };

    // Hard cap: always restore scroll within 3 s so a missing load event
    // (service worker, flaky mobile network) never leaves the page locked.
    const fallback = setTimeout(restoreScroll, 3000);

    // Also restore immediately on first scroll attempt — the user is ready.
    const onFirstScroll = () => restoreScroll();
    window.addEventListener("scroll", onFirstScroll, { once: true, passive: true });

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        window.removeEventListener("scroll", onFirstScroll);
        clearTimeout(fallback);
      };
    }

    return () => {
      window.removeEventListener("scroll", onFirstScroll);
      clearTimeout(fallback);
    };
  }, []);

  if (!isLoading || !animationData) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 transition-opacity duration-500"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "auto" : "none",
      }}
    >
      <div className="w-48 h-48 md:w-64 md:h-64">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

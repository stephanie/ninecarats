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
    const handleLoad = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };

    // If page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isLoading || !animationData) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 transition-opacity duration-500"
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

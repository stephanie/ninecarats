"use client";

import { useEffect, useState } from "react";

// Returns the actual viewport height in pixels and sets the CSS var --vh
export function useViewportHeight(): number {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const vh = window.innerHeight;
    setViewportHeight(vh);
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // We intentionally do not attach resize/orientation listeners to avoid jank
  }, []);

  return viewportHeight;
}



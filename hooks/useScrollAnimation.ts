"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let cancelled = false;
    let delayTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const applyVisible = () => {
      if (cancelled) return;
      setIsVisible(true);
      if (triggerOnce) {
        setHasAnimated(true);
      }
    };

    const scheduleVisible = () => {
      if (delayTimeoutId !== undefined) {
        clearTimeout(delayTimeoutId);
        delayTimeoutId = undefined;
      }
      if (delay > 0) {
        delayTimeoutId = setTimeout(applyVisible, delay);
      } else {
        applyVisible();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          scheduleVisible();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // After client-side navigation (e.g. logo → home), some browsers omit the
    // initial IntersectionObserver callback. Drain records + fall back to a
    // layout-time bounds check so content is not stuck at opacity 0.
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        for (const entry of observer.takeRecords()) {
          if (entry.isIntersecting) {
            scheduleVisible();
            return;
          }
        }
        const rect = element.getBoundingClientRect();
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const intersects =
          rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0;
        if (intersects) {
          scheduleVisible();
        }
      });
    });

    return () => {
      cancelled = true;
      if (delayTimeoutId !== undefined) {
        clearTimeout(delayTimeoutId);
      }
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return {
    elementRef,
    isVisible: triggerOnce ? (hasAnimated ? true : isVisible) : isVisible,
  };
}

"use client";

import React, { useEffect, useRef } from "react";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion and use native smooth touch scroll on mobile (<768px)
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;
      if (prefersReduced || isMobile) return;
    }

    let isMounted = true;

    import("lenis").then(({ default: Lenis }) => {
      if (!isMounted) return;
      const lenis = new Lenis({
        autoRaf: true,
        anchors: { offset: -70 },
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        wheelMultiplier: 1.0,
        infinite: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;
    });

    return () => {
      isMounted = false;
      if (lenisRef.current) {
        lenisRef.current.destroy();
        delete window.__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}

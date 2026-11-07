"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion for accessibility
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Premium high-performance smooth scrolling across both desktop and mobile
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchInertiaExponent: 1.6,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      anchors: {
        offset: -70,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
      prevent: (node) => {
        return (
          node.hasAttribute("data-lenis-prevent") ||
          Boolean(node.closest("[data-lenis-prevent]")) ||
          Boolean(node.closest("#conversation-dialog, [role='dialog'], [role='menu']"))
        );
      },
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

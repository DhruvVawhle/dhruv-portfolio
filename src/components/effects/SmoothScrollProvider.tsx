"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";
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

    // Sync Lenis directly with Motion's frameloop for zero-jitter useScroll/useTransform
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      anchors: {
        offset: -72,
        duration: 1.1,
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

    const update = (data: { timestamp: number }) => {
      lenis.raf(data.timestamp);
    };

    frame.update(update, true);
    lenisRef.current = lenis;
    window.__lenis = lenis;

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

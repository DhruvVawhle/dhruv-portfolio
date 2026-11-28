"use client";

import React, { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion and skip Lenis on coarse-pointer / mobile screens
    // where native touch scrolling is used (syncTouch: false) to avoid idle RAF & reflow cost.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarsePointer || window.innerWidth < 768) return;

    let cancelled = false;
    let cleanupFn: (() => void) | undefined;

    Promise.all([import("lenis"), import("lenis/dist/lenis.css")]).then(([{ default: LenisCtor }]) => {
      if (cancelled) return;

      // Sync Lenis directly with Motion's frameloop for zero-jitter useScroll/useTransform
      const lenis = new LenisCtor({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.085,
        wheelMultiplier: 0.95,
        anchors: false,
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

      const resizeObserver = new ResizeObserver(() => {
        lenis.resize();
      });
      resizeObserver.observe(document.body);

      cleanupFn = () => {
        resizeObserver.disconnect();
        cancelFrame(update);
        lenis.destroy();
        lenisRef.current = null;
        delete window.__lenis;
      };
    });

    return () => {
      cancelled = true;
      cleanupFn?.();
    };
  }, []);

  return <>{children}</>;
}

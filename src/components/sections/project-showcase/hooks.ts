"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";

/**
 * Zero-re-render 3D pointer tilt & specular highlight hook.
 * Mutates CSS custom properties (--tilt-x, --tilt-y, --mx, --my) directly on the target element.
 */
export function usePointerTilt(disabled: boolean) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canHoverRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || !canHoverRef.current || e.pointerType !== "mouse") return;
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const tiltX = (0.5 - py) * 7; // max +/- 3.5deg
      const tiltY = (px - 0.5) * 7;

      el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--tilt-ease", "80ms");
    },
    [disabled]
  );

  const handlePointerLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.setProperty("--tilt-ease", "320ms");
  }, []);

  return { cardRef, handlePointerMove, handlePointerLeave };
}

/**
 * Tracks whether the desktop lg+ media query is active.
 */
export function useIsDesktopStage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

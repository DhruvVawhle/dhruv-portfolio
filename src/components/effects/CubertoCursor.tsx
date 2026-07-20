"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function CubertoCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true to avoid server-side / hydration flicker

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Cuberto trailing physics
  const springConfig = { stiffness: 450, damping: 28, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch device or coarse pointer
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse || shouldReduceMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering interactive element
      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, [data-cursor], [data-interactive]'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
        const customLabel = interactiveEl.getAttribute("data-cursor-text");
        setHoverText(customLabel || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, shouldReduceMotion]);

  if (isTouchDevice || shouldReduceMotion || !isVisible) return null;

  return (
    <>
      {/* Primary tight dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          width: isHovered ? "4px" : "8px",
          height: isHovered ? "4px" : "8px",
          backgroundColor: isHovered ? "transparent" : "var(--accent, #3b82f6)",
          transition: "width 0.2s, height 0.2s, background-color 0.2s",
        }}
      />

      {/* Trailing smooth ring / expanded sphere */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center overflow-hidden shadow-sm"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? (hoverText ? "76px" : "50px") : "28px",
          height: isHovered ? (hoverText ? "76px" : "50px") : "28px",
          backgroundColor: isHovered
            ? (hoverText ? "rgba(59, 130, 246, 0.22)" : "rgba(59, 130, 246, 0.15)")
            : "rgba(59, 130, 246, 0.08)",
          border: isHovered
            ? "1.5px solid rgba(59, 130, 246, 0.8)"
            : "1px solid rgba(59, 130, 246, 0.3)",
          backdropFilter: isHovered ? "blur(6px)" : "none",
          transition: "width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s, border 0.25s",
        }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[10px] uppercase font-bold text-neutral-900 dark:text-white px-1 text-center leading-tight tracking-wider"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

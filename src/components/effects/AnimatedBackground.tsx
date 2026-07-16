"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { stiffness: 60, damping: 25, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient mesh blobs */}
      <div className="gradient-mesh" />

      {/* Grid dot pattern */}
      <div className="grid-pattern" />

      {/* Interactive Cuberto ambient cursor glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute pointer-events-none rounded-full blur-3xl opacity-20 sm:opacity-25"
          style={{
            x: smoothX,
            y: smoothY,
            width: "550px",
            height: "550px",
            left: "-275px",
            top: "-275px",
            background:
              "radial-gradient(circle, var(--accent, #3b82f6) 0%, transparent 70%)",
            transition: "opacity 0.4s ease",
          }}
        />
      )}

      {/* Subtle radial gradient fade at bottom for section transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </div>
  );
}

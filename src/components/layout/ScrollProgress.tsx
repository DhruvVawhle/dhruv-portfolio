"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[80] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-accent origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}


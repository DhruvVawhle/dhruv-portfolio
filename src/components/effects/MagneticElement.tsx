"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0 to 1, default 0.35 (how strongly it pulls towards cursor)
  ripple?: boolean; // enable click ripple effect
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  as?: "div" | "span" | "button";
}

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export default function MagneticElement({
  children,
  className = "",
  strength = 0.35,
  ripple = false,
  onClick,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  // Motion values for smooth spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 18, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ripple && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const rippleX = e.clientX - rect.left;
      const rippleY = e.clientY - rect.top;
      const newRipple: RippleItem = {
        id: Date.now(),
        x: rippleX,
        y: rippleY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation finishes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY,
      }}
      className={`relative inline-block ${ripple ? "overflow-hidden" : ""} ${className}`}
    >
      {children}
      {ripple &&
        ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full pointer-events-none bg-white/30 animate-ripple"
            style={{
              left: r.x,
              top: r.y,
              width: "10px",
              height: "10px",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </motion.div>
  );
}

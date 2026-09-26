"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Only calculate styles when card is visible in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    observer.observe(card);

    let rafId: number | null = null;
    let pendingX = 0;
    let pendingY = 0;

    const applyCoordinates = () => {
      if (cardRef.current && isVisibleRef.current) {
        cardRef.current.style.setProperty("--x", `${pendingX.toFixed(1)}px`);
        cardRef.current.style.setProperty("--xp", (pendingX / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty("--y", `${pendingY.toFixed(1)}px`);
        cardRef.current.style.setProperty("--yp", (pendingY / window.innerHeight).toFixed(2));
      }
      rafId = null;
    };

    const scheduleUpdate = (x: number, y: number) => {
      pendingX = x;
      pendingY = y;
      if (!rafId) {
        rafId = requestAnimationFrame(applyCoordinates);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // Touch handled separately
      scheduleUpdate(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        scheduleUpdate(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        scheduleUpdate(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const inlineStyles: React.CSSProperties & { [key: string]: string | number } = {
    "--base": base,
    "--spread": spread,
    "--radius": "16",
    "--size": "260",
    "--hue": "calc(var(--base) + (var(--xp, 0.5) * var(--spread, 0)))",
    "--spotlight-size": "calc(var(--size, 200) * 1px)",
    position: "relative",
    touchAction: "pan-y",
    WebkitTapHighlightColor: "transparent",
    ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === "number" ? `${height}px` : height }),
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={inlineStyles}
      className={`
        ${getSizeClasses()}
        ${!customSize ? "aspect-[3/4]" : ""}
        rounded-3xl
        relative
        transition-colors
        duration-300
        ${className}
      `}
    >
      {/* High-performance hardware accelerated spotlight overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-80"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at var(--x, 50%) var(--y, 50%), hsl(var(--hue, 210) 90% 65% / 0.12), transparent 75%)`,
            backgroundAttachment: "fixed",
          }}
        />
        <div
          className="absolute inset-0 rounded-[inherit] p-[1px]"
          style={{
            background: `radial-gradient(calc(var(--spotlight-size) * 0.8) calc(var(--spotlight-size) * 0.8) at var(--x, 50%) var(--y, 50%), hsl(var(--hue, 210) 95% 60% / 0.4), transparent 80%)`,
            backgroundAttachment: "fixed",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />
      </div>

      {children}
    </div>
  );
};

export default GlowCard;


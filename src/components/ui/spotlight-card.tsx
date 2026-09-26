"use client";

import React, { useRef, ReactNode, useCallback } from "react";

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
  green: { base: 140, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 32, spread: 200 },
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
  const rafId = useRef<number | null>(null);

  const updateCoordinates = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const xp = Math.max(0, Math.min(1, x / rect.width));
      const yp = Math.max(0, Math.min(1, y / rect.height));

      card.style.setProperty("--x", `${x.toFixed(1)}px`);
      card.style.setProperty("--y", `${y.toFixed(1)}px`);
      card.style.setProperty("--xp", xp.toFixed(2));
      card.style.setProperty("--yp", yp.toFixed(2));
    });
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handlePointerLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    // Smoothly restore default center highlight
    if (cardRef.current) {
      cardRef.current.style.setProperty("--x", "50%");
      cardRef.current.style.setProperty("--y", "35%");
      cardRef.current.style.setProperty("--xp", "0.5");
      cardRef.current.style.setProperty("--yp", "0.35");
    }
  };

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return "";
    return sizeMap[size];
  };

  const inlineStyles: React.CSSProperties & { [key: string]: string | number } = {
    "--base": base,
    "--spread": spread,
    "--radius": "16",
    "--size": "320",
    "--x": "50%",
    "--y": "35%",
    "--xp": "0.5",
    "--yp": "0.35",
    "--hue": "calc(var(--base) + (var(--xp, 0.5) * var(--spread, 0)))",
    "--spotlight-size": "calc(var(--size, 300) * 1px)",
    position: "relative",
    touchAction: "pan-y",
    WebkitTapHighlightColor: "transparent",
    transform: "translateZ(0)", // GPU compositor layer isolation
    ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === "number" ? `${height}px` : height }),
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={inlineStyles}
      onPointerMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      onPointerLeave={handlePointerLeave}
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
      {/* High-performance hardware-accelerated spotlight overlay (zero backgroundAttachment:fixed) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-85 transition-opacity duration-300"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(var(--spotlight-size) var(--spotlight-size) at var(--x, 50%) var(--y, 35%), hsl(var(--hue, 210) 90% 65% / 0.14), transparent 75%)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-[inherit] p-[1px]"
          style={{
            background: `radial-gradient(calc(var(--spotlight-size) * 0.8) calc(var(--spotlight-size) * 0.8) at var(--x, 50%) var(--y, 35%), hsl(var(--hue, 210) 95% 60% / 0.45), transparent 80%)`,
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

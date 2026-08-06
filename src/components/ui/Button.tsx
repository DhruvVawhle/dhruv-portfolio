"use client";

import { cn } from "@/lib/utils";
import React, { type ButtonHTMLAttributes, forwardRef, useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  download?: boolean | string;
  magnetic?: boolean;
  ripple?: boolean;
}

const FILL_DURATION = 0.5;
const FILL_EASE = [0.16, 1, 0.3, 1] as const;

function getCoverDiameter(width: number, height: number, x: number, y: number) {
  return Math.ceil(
    2 *
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y)
      )
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      magnetic = true,
      ripple = true,
      onClick,
      onBlur,
      onFocus,
      onKeyDown,
      onKeyUp,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerUp,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

    // Origin fill states
    const [hovered, setHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });
    const [coverSize, setCoverSize] = useState(0);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 220, damping: 20, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!magnetic || shouldReduceMotion || !internalRef.current) return;
      const rect = (internalRef.current as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * 0.22;
      const distanceY = (e.clientY - centerY) * 0.22;

      x.set(distanceX);
      y.set(distanceY);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
      if (magnetic) {
        x.set(0);
        y.set(0);
      }
      setHovered(false);
      setIsPressed(false);
      onPointerLeave?.(e as any);
    };

    const updateOrigin = useCallback((x: number, y: number) => {
      const node = internalRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      setOrigin({ x, y });
      setCoverSize(getCoverDiameter(rect.width, rect.height, x, y));
    }, []);

    const updateOriginFromPointer = useCallback(
      (event: React.PointerEvent<any>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        updateOrigin(event.clientX - rect.left, event.clientY - rect.top);
      },
      [updateOrigin]
    );

    const updateOriginFromCenter = useCallback(() => {
      const node = internalRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      updateOrigin(rect.width / 2, rect.height / 2);
    }, [updateOrigin]);

    const showFill = ripple && (hovered || isPressed);

    useLayoutEffect(() => {
      const node = internalRef.current;
      if (!(node && showFill)) return;

      const measure = () => {
        const rect = node.getBoundingClientRect();
        setCoverSize(
          getCoverDiameter(rect.width, rect.height, origin.x, origin.y)
        );
      };

      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(node);

      const fonts = document.fonts;
      if (fonts?.ready) {
        fonts.ready.then(measure).catch(() => undefined);
      }

      return () => observer.disconnect();
    }, [showFill, origin.x, origin.y]);

    const fillTransition = { duration: FILL_DURATION, ease: FILL_EASE };

    const setRefs = (element: any) => {
      internalRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as any).current = element;
      }
    };

    const shouldReduceMotion = useReducedMotion();

    const baseStyles =
      "relative inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer select-none overflow-hidden active:scale-[0.98] z-10";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent-hover shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.45)] hover:-translate-y-0.5",
      secondary:
        "bg-bg-surface text-text-primary border border-border-custom hover:border-accent hover:text-accent shadow-sm hover:shadow hover:-translate-y-0.5",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover",
    };

    const sizes = {
      sm: "px-4 py-2 text-[15px] sm:text-xs min-h-[48px] sm:min-h-[36px] sm:h-9",
      md: "px-6 py-3 text-[15px] sm:text-base min-h-[48px] sm:min-h-[50px] sm:h-12",
      lg: "px-8 py-4 text-base sm:text-lg font-bold min-h-[54px] sm:min-h-[56px] sm:h-14",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const pointerEvents = {
      onBlur: (event: any) => {
        onBlur?.(event);
        setIsPressed(false);
        setHovered(false);
      },
      onClick: onClick,
      onFocus: (event: any) => {
        onFocus?.(event);
        if (event.currentTarget.matches(":focus-visible")) {
          updateOriginFromCenter();
          setHovered(true);
        }
      },
      onKeyDown: (event: any) => {
        onKeyDown?.(event);
        if (event.key === " " || event.key === "Enter") {
          updateOriginFromCenter();
          setIsPressed(true);
          setHovered(true);
        }
      },
      onKeyUp: (event: any) => {
        onKeyUp?.(event);
        setIsPressed(false);
        setHovered(false);
      },
      onPointerCancel: (event: any) => {
        onPointerCancel?.(event);
        setIsPressed(false);
      },
      onPointerDown: (event: any) => {
        onPointerDown?.(event);
        updateOriginFromPointer(event);
        setIsPressed(true);
        setHovered(true);
      },
      onPointerEnter: (event: any) => {
        onPointerEnter?.(event);
        updateOriginFromPointer(event);
        setHovered(true);
      },
      onPointerUp: (event: any) => {
        onPointerUp?.(event);
        setIsPressed(false);
      },
    };

    const fillOverlay = ripple ? (
      <motion.span
        animate={{ scale: showFill && coverSize > 0 ? 1 : 0 }}
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full z-0"
        initial={false}
        style={{
          height: coverSize,
          left: origin.x,
          top: origin.y,
          width: coverSize,
          backgroundColor: variant === "primary" ? "rgba(255, 255, 255, 0.15)" : "rgba(59, 130, 246, 0.08)",
        }}
        transition={fillTransition}
      />
    ) : null;

    if (href) {
      return (
        <motion.a
          ref={setRefs as any}
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            x: shouldReduceMotion ? 0 : springX,
            y: shouldReduceMotion ? 0 : springY,
          }}
          data-cursor-text="LINK"
          {...pointerEvents}
          {...(props as any)}
        >
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
          {fillOverlay}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={setRefs as any}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: shouldReduceMotion ? 0 : springX,
          y: shouldReduceMotion ? 0 : springY,
        }}
        data-cursor-text={variant === "primary" ? "CLICK" : undefined}
        {...pointerEvents}
        {...(props as any)}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {fillOverlay}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;

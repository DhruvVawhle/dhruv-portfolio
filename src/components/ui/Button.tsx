"use client";

import { cn } from "@/lib/utils";
import React, { type ButtonHTMLAttributes, forwardRef, useRef, useState } from "react";
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

interface RippleItem {
  id: number;
  x: number;
  y: number;
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
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const [ripples, setRipples] = useState<RippleItem[]>([]);

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

    const handleMouseLeave = () => {
      if (!magnetic) return;
      x.set(0);
      y.set(0);
    };

    const handleClick = (e: React.MouseEvent<any>) => {
      if (ripple && internalRef.current) {
        const rect = (internalRef.current as HTMLElement).getBoundingClientRect();
        const rippleX = e.clientX - rect.left;
        const rippleY = e.clientY - rect.top;
        const newRipple: RippleItem = {
          id: Date.now(),
          x: rippleX,
          y: rippleY,
        };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }

      if (onClick) {
        onClick(e);
      }
    };

    const setRefs = (element: any) => {
      internalRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as any).current = element;
      }
    };

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

    const renderedRipples = ripple ? (
      ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none bg-white/35 animate-ripple z-0"
          style={{
            left: r.x,
            top: r.y,
            width: "12px",
            height: "12px",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))
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
          onClick={handleClick}
          style={{
            x: shouldReduceMotion ? 0 : springX,
            y: shouldReduceMotion ? 0 : springY,
          }}
          data-cursor-text="LINK"
          {...(props as any)}
        >
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
          {renderedRipples}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={setRefs as any}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          x: shouldReduceMotion ? 0 : springX,
          y: shouldReduceMotion ? 0 : springY,
        }}
        data-cursor-text={variant === "primary" ? "CLICK" : undefined}
        {...(props as any)}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {renderedRipples}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;

"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { EMAIL_ADDRESS } from "@/data/credentialsAndConnect";
import { usePointerTilt } from "@/components/sections/project-showcase/hooks";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [istTime, setIstTime] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const { cardRef, handlePointerMove, handlePointerLeave } =
    usePointerTilt(shouldReduceMotion);

  // Cinematic scroll-driven entrance & perspective settle
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 60%"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.45,
  });
  const cardScale = useTransform(smoothScroll, [0, 1], [0.94, 1]);
  const cardY = useTransform(smoothScroll, [0, 1], [34, 0]);
  const cardRotateX = useTransform(smoothScroll, [0, 1], [4, 0]);

  // Live clock for Asia/Kolkata updating every 20 seconds
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(now);
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime("Asia/Kolkata");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[var(--section-padding-y)] bg-bg scroll-mt-20 sm:scroll-mt-24 overflow-x-clip"
      aria-label="Connect Section"
    >
      <div className="content-width">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-accent">Connect</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Scroll-Driven & Hover-Interactive Connect Card */}
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                scale: cardScale,
                y: cardY,
                rotateX: cardRotateX,
                transformPerspective: 1200,
              }
          }
          className="will-change-transform"
        >
          <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transform: shouldReduceMotion
                  ? undefined
                  : "perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                transition: shouldReduceMotion
                  ? undefined
                  : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease",
              }}
              className="group relative rounded-3xl border border-border-custom hover:border-accent/50 bg-bg-surface shadow-xl hover:shadow-2xl hover:shadow-accent/10 overflow-hidden px-6 py-10 sm:px-10 sm:py-12 text-center flex flex-col items-center will-change-transform"
            >
              {/* Pointer-tracked radial specular sheen */}
              {!shouldReduceMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.1), transparent 65%)",
                  }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
                {/* Status & Location Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-text-secondary mb-6 font-body">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 font-medium text-emerald-700 dark:text-emerald-400">
                    Open to engineering roles (2027)
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg border border-border-custom">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>Mumbai, India</span>
                  </span>
                  {istTime && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg border border-border-custom tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>{istTime}</span>
                    </span>
                  )}
                </div>

                {/* Heading */}
                <h2 className="font-display font-bold text-[clamp(28px,4.4vw,44px)] leading-[1.08] tracking-tight text-text-primary max-w-[18ch] sm:max-w-none text-balance">
                  Let&apos;s build reliable software together.
                </h2>

                {/* Subcopy */}
                <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-[48ch] mx-auto mb-7">
                  Hiring for your engineering team, or want to talk full-stack architecture and applied AI systems? Send me a message.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="group/btn min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-accent text-white font-sans text-sm font-semibold shadow-md hover:shadow-lg hover:bg-accent/90 transition-[background-color,box-shadow,transform] duration-150 cursor-pointer active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Start a conversation</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/res min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border-custom bg-bg hover:border-accent hover:text-accent text-text-primary font-sans text-sm font-medium transition-[border-color,color,transform] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View resume</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/res:translate-x-0.5 group-hover/res:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

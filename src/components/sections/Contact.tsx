"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { EMAIL_ADDRESS } from "@/data/credentialsAndConnect";

export default function Contact() {
  const [istTime, setIstTime] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-500);
    mouseY.set(-500);
  };

  return (
    <section id="contact" className="py-[var(--section-padding-y)] bg-bg scroll-mt-20 sm:scroll-mt-24" aria-label="Connect Section">
      <div className="content-width">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Connect
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Minimal Centred Connect Card (Option C) */}
        <ScrollReveal direction="up" delay={0.15} scale={0.97} blur>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-[22px] border border-border-custom bg-bg-surface hover:border-accent/50 shadow-xl overflow-hidden group transition-all duration-500 px-6 py-10 sm:px-8 sm:py-11 text-center flex flex-col items-center"
          >

            {/* Cursor-following blue glow */}
            <motion.div
              style={{
                left: mouseX,
                top: mouseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="pointer-events-none absolute w-[450px] h-[450px] rounded-full bg-blue-500/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
              {/* 1. Status & Location metadata */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-text-secondary mb-6 font-body">
                <span className="inline-flex items-center gap-1.5 font-medium text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Graduating 2027 · Open to Engineering Roles
                </span>
                <span className="text-border-custom hidden sm:inline">•</span>
                <span>Mumbai, India</span>
                {istTime && (
                  <>
                    <span className="text-border-custom hidden sm:inline">•</span>
                    <span className="tabular-nums">{istTime}</span>
                  </>
                )}
              </div>

              {/* 2. Heading */}
              <h2 className="font-display font-bold text-[clamp(28px,4.4vw,42px)] leading-[1.08] tracking-tight text-text-primary max-w-[18ch] sm:max-w-none text-balance">
                Let&apos;s build reliable software together.
              </h2>

              {/* 3. Paragraph */}
              <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-[46ch] mx-auto mb-6">
                Hiring for your engineering team, or want to talk full-stack architecture and applied AI systems? Send me a message.
              </p>

              {/* 4. Action Buttons */}
              <div className="flex flex-wrap justify-center gap-2.5">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-accent text-white font-sans text-sm font-semibold shadow-md hover:shadow-xl hover:shadow-accent/25 hover:bg-accent/90 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Start a conversation</span>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-border-custom bg-bg-surface hover:border-accent hover:bg-accent/5 text-text-primary font-mono text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>View resume ↗</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

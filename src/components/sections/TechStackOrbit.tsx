"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import TechIcon from "@/components/ui/TechIcon";
import ScrollReveal from "@/components/effects/ScrollReveal";

const row1Items = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
  "MongoDB",
];

const row2Items = [
  "Firebase",
  "Razorpay",
  "Git",
  "Docker",
  "Google Cloud",
  "Vercel",
];

export default function TechStackOrbit() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="tech-orbit"
      aria-label="Technology Stack Centerpiece"
      className="relative overflow-hidden py-20 md:py-28 border-b border-[#1F2328]"
      style={{
        backgroundColor: "#0A0A0B",
        color: "#EDEDED",
      }}
    >
      {/* Ambient Radial Spotlight Glow behind section */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.03) 45%, transparent 70%)",
        }}
      />

      <div className="content-width relative z-10 flex flex-col items-center">
        {/* Tagline Block */}
        <ScrollReveal className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[#EDEDED] tracking-tight mb-2.5">
            Full-stack engineering meets applied AI/ML.
          </h2>
          <p className="font-mono text-xs md:text-sm text-[#9CA3AF]">
            Real data, real users, real legal ownership — not just tutorials.
          </p>
        </ScrollReveal>

        {/* Icon Rows */}
        <div className="flex flex-col items-center gap-3.5 md:gap-4 mb-16 md:mb-20 w-full">
          {/* Row 1 */}
          <ScrollReveal delay={0.1} className="w-full">
            <div className="flex flex-wrap justify-center items-center gap-2.5 md:gap-3">
              {row1Items.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2.5 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#141517] border border-white/10 hover:border-[#3B82F6]/50 hover:shadow-[0_0_16px_rgba(59,130,246,0.22)] transition-all duration-300 cursor-default"
                >
                  <TechIcon name={tech} size="sm" />
                  <span className="font-mono text-xs md:text-sm font-medium text-[#EDEDED] whitespace-nowrap">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Row 2 */}
          <ScrollReveal delay={0.2} className="w-full">
            <div className="flex flex-wrap justify-center items-center gap-2.5 md:gap-3">
              {row2Items.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2.5 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#141517] border border-white/10 hover:border-[#3B82F6]/50 hover:shadow-[0_0_16px_rgba(59,130,246,0.22)] transition-all duration-300 cursor-default"
                >
                  <TechIcon name={tech} size="sm" />
                  <span className="font-mono text-xs md:text-sm font-medium text-[#EDEDED] whitespace-nowrap">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Central Orbit Visual */}
        <ScrollReveal
          delay={0.3}
          className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px]"
        >
          {/* Vertical Light Rays / Beams connecting Core to Icons above */}
          <div
            className="absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2 w-32 md:w-48 h-40 md:h-52 pointer-events-none opacity-60"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.15) 50%, transparent 100%)",
              filter: "blur(20px)",
            }}
          />

          {/* Outer Orbital Ring (Ring 3 - Hidden on smallest mobile screens to reduce noise) */}
          <motion.div
            aria-hidden="true"
            className="hidden sm:block absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-[#3B82F6]/20 pointer-events-none"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Orbital Node Markers along Ring 3 */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6]" />
            <span className="absolute top-1/4 right-2 w-2 h-2 rounded-full bg-[#3B82F6]/60 shadow-[0_0_6px_#3B82F6]" />
            <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-[#3B82F6]/60 shadow-[0_0_6px_#3B82F6]" />
          </motion.div>

          {/* Middle Orbital Ring (Ring 2) */}
          <motion.div
            aria-hidden="true"
            className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[330px] md:h-[330px] rounded-full border border-[#3B82F6]/25 pointer-events-none"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: -360,
                  }
            }
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Orbital Node Markers along Ring 2 */}
            <span className="absolute top-8 left-6 w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3B82F6]/80 shadow-[0_0_6px_#3B82F6]" />
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
          </motion.div>

          {/* Inner Orbital Ring (Ring 1) */}
          <motion.div
            aria-hidden="true"
            className="absolute w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] md:w-[220px] md:h-[220px] rounded-full border border-[#3B82F6]/35 pointer-events-none"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Orbital Node Markers along Ring 1 */}
            <span className="absolute top-2 right-6 w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]" />
            <span className="absolute bottom-3 left-4 w-2 h-2 rounded-full bg-[#3B82F6]/70 shadow-[0_0_6px_#3B82F6]" />
          </motion.div>

          {/* Glowing Central Core Monogram */}
          <motion.div
            className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#141517] border border-[#3B82F6]/40 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.35)]"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.03, 1],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Core inner halo */}
            <div
              className="absolute inset-2 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
              }}
            />
            <span className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#EDEDED] tracking-tight relative z-10">
              DV<span className="text-[#3B82F6]">.</span>
            </span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

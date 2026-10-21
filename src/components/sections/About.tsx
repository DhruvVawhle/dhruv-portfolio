"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Layers, Brain, ShieldCheck, ArrowUpRight } from "lucide-react";
import { WORKFLOW_STEPS } from "@/data/engineeringWorkflow";
import VSCodeEditor from "@/components/sections/VSCodeEditor";
import ScrollReveal from "@/components/effects/ScrollReveal";

const PHILOSOPHY_BULLETS = [
  "Solve real user problems before writing code.",
  "Design systems that are maintainable and scalable.",
  "Prioritize performance, accessibility, and reliability.",
  "Choose technologies based on long-term value, not trends.",
  "Continuously learn, iterate, and improve.",
];

export default function About() {
  const [activeStepCount, setActiveStepCount] = useState<number>(1);
  const shouldReduceMotion = useReducedMotion();
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger line calculation via requestAnimationFrame on scroll
  useEffect(() => {
    let animId: number;

    const checkScrollProgress = () => {
      const isMobile = window.innerWidth < 1024;
      // Trigger line: middle of viewport on desktop; 280px from top on mobile (below sticky editor)
      const triggerY = isMobile ? 320 : window.innerHeight * 0.5;

      let highestPassed = 0;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Step counts as done when its icon passes trigger line
        if (rect.top <= triggerY) {
          highestPassed = index + 1;
        }
      });

      setActiveStepCount(highestPassed);
    };

    let isNearViewport = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        if (entry.isIntersecting) {
          checkScrollProgress();
        }
      },
      { rootMargin: "200px" }
    );

    const sectionEl = document.getElementById("about");
    if (sectionEl) observer.observe(sectionEl);

    const handleScroll = () => {
      if (!isNearViewport) return;
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(checkScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScrollProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (el) {
      const yOffset = -140;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="py-[var(--section-padding-y)] bg-bg section-alt relative scroll-mt-20 sm:scroll-mt-24"
      aria-label="About and Engineering Philosophy Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Profile &amp; Philosophy
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Engineering with intent and problem-first focus.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Transforming complex algorithmic challenges into accessible, high-performance web applications and secure AI solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* 2. Engineering With Intent (Balanced Two-Column Card) */}
        <ScrollReveal>
          <div className="p-8 sm:p-10 rounded-3xl bg-bg-surface border border-border-custom shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-stretch">
              {/* Left Column: Quote, Intro & Stretched Bullets */}
              <div className="flex flex-col">
                <blockquote className="border-l-4 border-accent pl-4 sm:pl-6 my-2">
                  <p className="font-display font-bold text-[17px] lg:text-[22px] leading-snug text-text-primary italic">
                    &ldquo;Great software isn&apos;t measured by the number of features it has, but by how effectively it solves real problems.&rdquo;
                  </p>
                </blockquote>

                <p className="mt-5 mb-4 text-sm text-text-secondary font-medium">
                  Every project I build follows a simple philosophy:
                </p>

                <ul className="flex flex-col justify-between gap-3 flex-1">
                  {PHILOSOPHY_BULLETS.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex-1 flex items-center gap-3 border-b border-border-custom pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="w-[18px] h-[18px] min-w-[18px] min-h-[18px] rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] flex items-center justify-center flex-shrink-0">
                        ✓
                      </span>
                      <span className="text-[14.5px] text-text-primary leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Focus areas & Currently building panel */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="lg:border-l lg:border-border-custom lg:pl-12 flex flex-col"
              >
                <div className="rounded-xl border border-blue-100 dark:border-border-custom bg-blue-50/70 dark:bg-white/[0.03] p-5 sm:p-6 h-full flex flex-col justify-between gap-6">
                  {/* Section 1: Focus areas */}
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">
                      Focus areas
                    </div>
                    <div className="divide-y divide-border-custom">
                      <div className="flex items-center gap-3 py-3 first:pt-2">
                        <div className="w-8 h-8 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0 text-accent">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-text-primary">
                            Full-stack development
                          </div>
                          <div className="text-[12.5px] text-text-secondary leading-normal">
                            Next.js, TypeScript and Tailwind front ends with API backends.
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 py-3 last:pb-0">
                        <div className="w-8 h-8 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0 text-accent">
                          <Brain className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-text-primary">
                            AI / ML engineering
                          </div>
                          <div className="text-[12.5px] text-text-secondary leading-normal">
                            LLM security, detection models and applied AI products.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Currently building */}
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-text-secondary font-semibold mb-1">
                      Currently building
                    </div>
                    <div className="divide-y divide-border-custom">
                      {/* PromptShield */}
                      <a
                        href="#projects"
                        className="group flex items-center justify-between gap-3 py-3 first:pt-2 last:pb-0 focus-visible:outline-2 focus-visible:outline-accent rounded-lg"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0 text-accent">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                              PromptShield
                            </div>
                            <div className="text-[12.5px] text-text-secondary leading-normal">
                              Prompt injection detection for LLMs.
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* 3. How I Build Software (Interactive Sticky VS Code Window) */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary tracking-tight">
                How I build software
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 font-mono text-xs font-bold text-accent">
              <span>{activeStepCount} / 7 steps built</span>
            </div>
          </div>

          {/* Dual-column sticky container: Steps on Left, Sticky Editor on Right */}
          <div ref={containerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 7 Interactive Steps */}
            <div className="lg:col-span-6 relative pb-12">
              {/* Vertical Continuous Progress Line */}
              <div
                aria-hidden="true"
                className="absolute left-6 top-8 bottom-8 w-0.5 bg-border-custom"
              >
                <div
                  style={{
                    height: `${(Math.max(0, activeStepCount - 1) / 6) * 100}%`,
                  }}
                  className="w-full bg-accent transition-all duration-300"
                />
              </div>

              <div className="space-y-6">
                {WORKFLOW_STEPS.map((step, idx) => {
                  const isDone = idx < activeStepCount;

                  return (
                    <div
                      key={step.id}
                      ref={(el) => {
                        stepRefs.current[idx] = el;
                      }}
                      className="relative pl-14"
                    >
                      {/* Step Status Icon / Self-drawing Check */}
                      <div
                        onClick={() => scrollToStep(idx)}
                        className={`absolute left-0 top-4 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-sm ${
                          isDone
                            ? "bg-accent border-accent text-white"
                            : "bg-bg-surface border-border-custom text-text-secondary"
                        }`}
                      >
                        {isDone ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline
                              points="20 6 9 17 4 12"
                              className="animate-[stroke-draw_0.4s_ease-out_forwards]"
                              strokeDasharray="24"
                              strokeDashoffset="0"
                            />
                          </svg>
                        ) : (
                          <span className="font-mono text-xs font-bold">
                            {step.id}
                          </span>
                        )}
                      </div>

                      {/* Step Card with Accessible Button Trigger */}
                      <button
                        type="button"
                        onClick={() => scrollToStep(idx)}
                        className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          isDone
                            ? "bg-bg-surface border-border-custom opacity-100 shadow-sm"
                            : "bg-bg-surface/50 border-border-custom/50 opacity-40 hover:opacity-75"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-xs font-bold text-accent">
                            {step.id}. {step.fnName}()
                          </span>
                          {isDone && (
                            <span className="font-mono text-[10px] text-text-secondary bg-foreground/5 px-2 py-0.5 rounded border border-border-custom">
                              added to solve.ts
                            </span>
                          )}
                        </div>

                        <h4 className="font-display font-bold text-lg text-text-primary mb-1">
                          {step.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Sticky VS Code Window */}
            <div className="lg:col-span-6 sticky top-20 z-20">
              <VSCodeEditor
                activeStepCount={activeStepCount}
                isTyping={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
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

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(checkScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScrollProgress();

    return () => {
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
      className="py-[var(--section-padding-y)] bg-bg section-alt relative"
      aria-label="About and Engineering Philosophy Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                01 · PROFILE &amp; PHILOSOPHY
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Software Engineering
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Dhruv Vawhle · Software Engineer
            </span>
          </div>
        </ScrollReveal>


        {/* 2. Engineering With Intent */}
        <ScrollReveal>
          <div className="p-8 sm:p-10 rounded-3xl bg-bg-surface border border-border-custom shadow-sm mb-16">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent block mb-3">
              Engineering with intent
            </span>

            <blockquote className="border-l-4 border-accent pl-4 sm:pl-6 my-4">
              <p className="font-display font-bold text-xl sm:text-2xl text-text-primary leading-snug italic">
                &ldquo;Great software isn&apos;t measured by the number of features it has, but by how effectively it solves real problems.&rdquo;
              </p>
            </blockquote>

            <p className="mt-6 text-base text-text-secondary font-medium">
              Every project I build follows a simple philosophy:
            </p>

            <ul className="mt-4 space-y-3">
              {PHILOSOPHY_BULLETS.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base text-text-primary leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* 3. How I Build Software (Interactive Sticky VS Code Window) */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent block mb-1">
                Engineering Execution Pipeline
              </span>
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

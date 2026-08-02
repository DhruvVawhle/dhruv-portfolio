"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

const CODE_LINES = [
  "function solve(problem) {",
  "    research(problem);",
  "    design(solution);",
  "    build(product);",
  "    test(reliability);",
  "    deploy(production);",
  "    improve(iteratively);",
  "}"
];

const FULL_CODE = CODE_LINES.join("\n");
const TASKS = ["Research", "Design", "Build", "Test", "Deploy", "Improve"];

export default function EngineeringExecutionCard() {
  const [phase, setPhase] = useState<"typing" | "executing" | "completed">("typing");
  const [typedLines, setTypedLines] = useState<string[]>([""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [activeExecutionIndex, setActiveExecutionIndex] = useState(-1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 1. Typing Logic Simulator
  useEffect(() => {
    if (phase !== "typing" || prefersReducedMotion) return;

    const targetLine = CODE_LINES[currentLineIndex];
    const delay = Math.floor(Math.random() * 20) + 40; // 40-60ms typing speed

    const timer = setTimeout(() => {
      if (currentCharIndex < targetLine.length) {
        const updatedLines = [...typedLines];
        updatedLines[currentLineIndex] = targetLine.slice(0, currentCharIndex + 1);
        setTypedLines(updatedLines);
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        if (currentLineIndex < CODE_LINES.length - 1) {
          setTypedLines((prev) => [...prev, ""]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          setPhase("executing");
          setActiveExecutionIndex(1); // Start executing research(problem)
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [phase, currentLineIndex, currentCharIndex, typedLines, prefersReducedMotion]);

  // 2. Step-by-Step Execution Simulator
  useEffect(() => {
    if (phase !== "executing" || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      if (activeExecutionIndex < CODE_LINES.length - 2) {
        setActiveExecutionIndex((prev) => prev + 1);
      } else {
        setPhase("completed");
      }
    }, 700); // 700ms execution delay

    return () => clearTimeout(timer);
  }, [phase, activeExecutionIndex, prefersReducedMotion]);

  // 3. Reset Cycle
  useEffect(() => {
    if (phase !== "completed" || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      setPhase("typing");
      setTypedLines([""]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setActiveExecutionIndex(-1);
    }, 2000); // Restart 2s after completion

    return () => clearTimeout(timer);
  }, [phase, prefersReducedMotion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_CODE);
    const { showToast } = require("@/components/ui/ClipboardToast");
    showToast("Code copied to clipboard");
  };

  return (
    <div
      ref={containerRef}
      className="p-6 rounded-3xl bg-bg-surface border border-border-custom shadow-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
      aria-label="Engineering Workflow Simulator"
    >
      {/* Subtle brand indicator line to match design system */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent/80 rounded-l-3xl" />

      {/* Header bar */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-border-custom/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-text-secondary">
            Workflow Simulator
          </h4>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 rounded-xl border border-border-custom bg-bg hover:bg-foreground/5 text-text-secondary hover:text-text-primary transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Copy code block"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </button>
      </div>

      {/* Premium Vercel/Linear CSS Grid Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Premium Light Code Editor (Left 75% on desktop / lg:col-span-3) */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-white text-neutral-900 shadow-inner font-mono text-[11px] sm:text-xs leading-relaxed relative min-h-[175px] flex flex-col justify-center border border-neutral-200">
          <div className="space-y-1.5 select-none">
            {typedLines.map((line, idx) => {
              // Minimal syntax coloring for light editor
              let lineClass = "text-neutral-400"; // Muted future
              let lineBg = "bg-transparent";

              if (phase === "typing") {
                if (idx === currentLineIndex) {
                  lineClass = "text-blue-600 font-semibold";
                  lineBg = "bg-blue-50/50 rounded px-1";
                }
                else if (idx < currentLineIndex) lineClass = "text-neutral-800";
              } else {
                if (idx === 0 || idx === CODE_LINES.length - 1) {
                  lineClass = "text-neutral-500";
                } else if (idx === activeExecutionIndex) {
                  lineClass = "text-blue-600 font-bold";
                  lineBg = "bg-blue-50 rounded px-1";
                } else if (idx < activeExecutionIndex || phase === "completed") {
                  lineClass = "text-emerald-600 font-semibold";
                  lineBg = "bg-emerald-50/40 rounded px-1";
                }
              }

              const isCurrentTypingLine = phase === "typing" && idx === currentLineIndex;

              return (
                <div key={idx} className={`flex items-center min-h-[20px] transition-colors duration-200 ${lineBg}`}>
                  <span className={`${lineClass} whitespace-pre flex-1`}>
                    {line}
                  </span>
                  {isCurrentTypingLine && (
                    <span className="w-1 h-3.5 bg-blue-600 ml-0.5 animate-pulse inline-block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium Side Execution Panel (Right 25% on desktop / lg:col-span-1) */}
        <div className="lg:col-span-1 p-5 rounded-2xl bg-bg border border-border-custom flex flex-col justify-between min-h-[150px]">
          <div>
            <div className="font-mono text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-wider mb-3.5 border-b border-border-custom/40 pb-1.5 flex justify-between">
              <span>Status</span>
              <span className="text-accent font-bold">
                {phase === "completed" ? "FINISHED" : "ACTIVE"}
              </span>
            </div>
            
            <div className="space-y-2.5 font-mono text-[11px] sm:text-xs">
              {TASKS.map((task) => {
                const associatedLineIndex = CODE_LINES.findIndex((line) => line.includes(task.toLowerCase()));
                
                let stateText = "Pending";
                let stateSymbol = "○";
                let colorClass = "text-text-secondary/55";

                if (phase === "executing") {
                  if (associatedLineIndex === activeExecutionIndex) {
                    stateSymbol = "⟳";
                    stateText = "Running";
                    colorClass = "text-blue-400 font-bold";
                  } else if (associatedLineIndex < activeExecutionIndex) {
                    stateSymbol = "✓";
                    stateText = "Completed";
                    colorClass = "text-emerald-500 font-semibold";
                  }
                } else if (phase === "completed") {
                  stateSymbol = "✓";
                  stateText = "Completed";
                  colorClass = "text-emerald-500 font-semibold";
                }

                return (
                  <div key={task} className={`flex items-center justify-between ${colorClass}`}>
                    <span>{task}</span>
                    <span className="text-[10px] flex items-center gap-1.5">
                      <span className={stateSymbol === "⟳" ? "animate-spin inline-block" : ""}>{stateSymbol}</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">{stateText}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

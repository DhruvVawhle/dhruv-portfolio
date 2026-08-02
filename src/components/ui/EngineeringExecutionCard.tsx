"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

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

// Maps lines to tasks in the side monitor
const LINE_TO_TASK_MAP: Record<number, string> = {
  1: "Research",
  2: "Design",
  3: "Build",
  4: "Test",
  5: "Deploy",
  6: "Improve"
};

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
    
    // Typing delay between 40ms and 60ms
    const delay = Math.floor(Math.random() * 20) + 40;

    const timer = setTimeout(() => {
      if (currentCharIndex < targetLine.length) {
        // Append character to the current line
        const updatedLines = [...typedLines];
        updatedLines[currentLineIndex] = targetLine.slice(0, currentCharIndex + 1);
        setTypedLines(updatedLines);
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        // Move to the next line if available
        if (currentLineIndex < CODE_LINES.length - 1) {
          setTypedLines((prev) => [...prev, ""]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          // Finished typing all lines, start execution phase
          setPhase("executing");
          setActiveExecutionIndex(1); // Start from line 1: research(problem)
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [phase, currentLineIndex, currentCharIndex, typedLines, prefersReducedMotion]);

  // 2. Step-by-Step Execution Simulator
  useEffect(() => {
    if (phase !== "executing" || prefersReducedMotion) return;

    // Execution delay: 700ms
    const timer = setTimeout(() => {
      if (activeExecutionIndex < CODE_LINES.length - 2) {
        setActiveExecutionIndex((prev) => prev + 1);
      } else {
        setPhase("completed");
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [phase, activeExecutionIndex, prefersReducedMotion]);

  // 3. Reset/Restart Cycle
  useEffect(() => {
    if (phase !== "completed" || prefersReducedMotion) return;

    // Restart 2 seconds after completion
    const timer = setTimeout(() => {
      setPhase("typing");
      setTypedLines([""]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setActiveExecutionIndex(-1);
    }, 2000);

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
      className="p-6 rounded-3xl bg-bg-surface border border-border-custom shadow-sm relative overflow-hidden group hover:border-accent/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)] transition-all duration-500"
      aria-label="Engineering Workflow Simulator"
    >
      {/* Accent strip on left side to match Intent card */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-emerald-500/80 rounded-l-3xl" />

      {/* Header with copy button */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-border-custom/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Workflow Simulator
          </h4>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 rounded-lg border border-border-custom bg-bg hover:bg-foreground/5 text-text-secondary hover:text-text-primary transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Copy Workflow Code"
          title="Copy Workflow Code"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </button>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Code Terminal View (Left 7 cols) */}
        <div className="md:col-span-8 p-4 rounded-xl bg-black/40 border border-border-custom/80 font-mono text-[11px] sm:text-xs leading-relaxed relative min-h-[170px] flex flex-col justify-center">
          <div className="space-y-1 select-none">
            {typedLines.map((line, idx) => {
              // Highlight styling
              let textColor = "text-gray-500"; // Muted future
              
              if (phase === "typing") {
                if (idx === currentLineIndex) textColor = "text-blue-400"; // Active
                else if (idx < currentLineIndex) textColor = "text-emerald-500/90"; // Typed/Past
              } else {
                // Executing or Completed phase
                if (idx === 0 || idx === CODE_LINES.length - 1) {
                  textColor = "text-text-primary/70";
                } else if (idx === activeExecutionIndex) {
                  textColor = "text-blue-400 font-bold"; // Current active line
                } else if (idx < activeExecutionIndex || phase === "completed") {
                  textColor = "text-emerald-400"; // Completed lines
                }
              }

              const isCurrentTypingLine = phase === "typing" && idx === currentLineIndex;

              return (
                <div key={idx} className="flex items-center min-h-[18px]">
                  {idx > 0 && idx < CODE_LINES.length - 1 ? (
                    <span className="text-[9px] text-gray-600 w-4 inline-block select-none">
                      {phase === "executing" && idx === activeExecutionIndex ? "▶" : "✓"}
                    </span>
                  ) : (
                    <span className="w-4" />
                  )}
                  <span className={`${textColor} whitespace-pre`}>
                    {line}
                  </span>
                  {isCurrentTypingLine && (
                    <span className="w-1.5 h-3.5 bg-blue-400 ml-0.5 animate-pulse inline-block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Checklist / Side Monitor (Right 4 cols) */}
        <div className="md:col-span-4 p-4 rounded-xl bg-white/[0.01] border border-border-custom/50 flex flex-col justify-between min-h-[140px]">
          <div>
            <div className="font-mono text-[10px] text-text-secondary uppercase tracking-wider mb-3 border-b border-border-custom/30 pb-1.5 flex justify-between">
              <span>Status Monitor</span>
              <span className="text-[9px] text-emerald-400">
                {phase === "completed" ? "IDLE" : "SIMULATING"}
              </span>
            </div>
            
            <div className="space-y-1.5 font-mono text-[11px]">
              {TASKS.map((task) => {
                const associatedLineIndex = CODE_LINES.findIndex((line) => line.includes(task.toLowerCase()));
                
                let statusText = " ";
                let colorClass = "text-gray-600";
                let isAnimating = false;

                if (phase === "executing") {
                  if (associatedLineIndex === activeExecutionIndex) {
                    statusText = "▶";
                    colorClass = "text-blue-400 font-semibold";
                    isAnimating = true;
                  } else if (associatedLineIndex < activeExecutionIndex) {
                    statusText = "✓";
                    colorClass = "text-emerald-500";
                  }
                } else if (phase === "completed") {
                  statusText = "✓";
                  colorClass = "text-emerald-500";
                }

                return (
                  <div key={task} className={`flex items-center justify-between py-0.5 ${colorClass}`}>
                    <span className="capitalize">{task}</span>
                    <span className="w-4 flex items-center justify-center font-bold">
                      {isAnimating ? (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                        >
                          {statusText}
                        </motion.span>
                      ) : (
                        statusText
                      )}
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

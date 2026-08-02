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
      className="p-5 sm:p-6 rounded-3xl bg-bg-surface border border-border-custom shadow-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
      aria-label="Engineering Workflow Simulator"
    >
      {/* Visual top bar resembling a VS Code editor tab header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-custom/50">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg/85 rounded-lg border border-border-custom/60 font-mono text-[10px] sm:text-xs text-text-primary">
            <span className="text-yellow-500 font-bold">JS</span>
            <span>solve.js</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 rounded-lg border border-border-custom/60 bg-bg/40 hover:bg-foreground/5 text-text-secondary hover:text-text-primary transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Copy code block"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </button>
      </div>

      {/* Grid: Responsive Stacking layout */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        
        {/* Editor Screen Code Area (Left/Top) */}
        <div className="flex-1 p-4 rounded-xl bg-black border border-border-custom/50 font-mono text-[11px] sm:text-xs leading-relaxed relative min-h-[175px] flex flex-col justify-center">
          <div className="space-y-1 select-none">
            {typedLines.map((line, idx) => {
              let lineClass = "text-text-secondary/50"; // Muted future
              
              if (phase === "typing") {
                if (idx === currentLineIndex) lineClass = "text-blue-400 font-semibold";
                else if (idx < currentLineIndex) lineClass = "text-emerald-500/80";
              } else {
                if (idx === 0 || idx === CODE_LINES.length - 1) {
                  lineClass = "text-text-primary/70";
                } else if (idx === activeExecutionIndex) {
                  lineClass = "text-blue-400 font-bold";
                } else if (idx < activeExecutionIndex || phase === "completed") {
                  lineClass = "text-emerald-400";
                }
              }

              const isCurrentTypingLine = phase === "typing" && idx === currentLineIndex;

              return (
                <div key={idx} className="flex items-start min-h-[18px]">
                  {/* VS Code Line Number */}
                  <span className="text-[10px] text-gray-700 w-5 inline-block select-none text-right pr-2">
                    {idx + 1}
                  </span>
                  <span className={`${lineClass} whitespace-pre flex-1`}>
                    {line}
                  </span>
                  {isCurrentTypingLine && (
                    <span className="w-1 h-3.5 bg-blue-400 ml-0.5 animate-pulse inline-block align-middle" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Execution Monitor Area (Right/Bottom) */}
        <div className="w-full lg:w-44 p-4 rounded-xl bg-bg border border-border-custom/50 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[9px] text-text-secondary uppercase tracking-wider mb-2.5 border-b border-border-custom/30 pb-1 flex justify-between">
              <span>Execution</span>
              <span className="text-emerald-400 font-bold">
                {phase === "completed" ? "SUCCESS" : "RUNNING"}
              </span>
            </div>
            
            <div className="space-y-1 font-mono text-[10px] sm:text-[11px]">
              {TASKS.map((task) => {
                const associatedLineIndex = CODE_LINES.findIndex((line) => line.includes(task.toLowerCase()));
                let statusIcon = " ";
                let colorClass = "text-text-secondary/50";
                let isAnimating = false;

                if (phase === "executing") {
                  if (associatedLineIndex === activeExecutionIndex) {
                    statusIcon = "▶";
                    colorClass = "text-blue-400 font-bold";
                    isAnimating = true;
                  } else if (associatedLineIndex < activeExecutionIndex) {
                    statusIcon = "✓";
                    colorClass = "text-emerald-400";
                  }
                } else if (phase === "completed") {
                  statusIcon = "✓";
                  colorClass = "text-emerald-400";
                }

                return (
                  <div key={task} className={`flex items-center justify-between py-0.5 ${colorClass}`}>
                    <span>{task}</span>
                    <span className="w-4 flex items-center justify-center font-bold">
                      {isAnimating ? (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                        >
                          {statusIcon}
                        </motion.span>
                      ) : (
                        statusIcon
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

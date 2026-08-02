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

  // 1. Typing Logic Simulator (45ms speed)
  useEffect(() => {
    if (phase !== "typing" || prefersReducedMotion) return;

    const targetLine = CODE_LINES[currentLineIndex];
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
    }, 45);

    return () => clearTimeout(timer);
  }, [phase, currentLineIndex, currentCharIndex, typedLines, prefersReducedMotion]);

  // 2. Step-by-Step Execution Simulator (700ms delay)
  useEffect(() => {
    if (phase !== "executing" || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      if (activeExecutionIndex < CODE_LINES.length - 2) {
        setActiveExecutionIndex((prev) => prev + 1);
      } else {
        setPhase("completed");
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [phase, activeExecutionIndex, prefersReducedMotion]);

  // 3. Reset Cycle (2s delay after completion)
  useEffect(() => {
    if (phase !== "completed" || prefersReducedMotion) return;

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

  // VS Code Light Theme Syntax Highlighter
  const renderSyntax = (lineText: string, idx: number) => {
    if (!lineText) return <span>&nbsp;</span>;

    // keyword syntax
    if (lineText.includes("function")) {
      return (
        <span>
          <span className="text-[#005cc5] font-semibold">function</span>{" "}
          <span className="text-[#24292e]">solve</span>(
          <span className="text-[#e36209]">problem</span>) &#123;
        </span>
      );
    }

    if (lineText.includes("}")) {
      return <span className="text-[#24292e]">&#125;</span>;
    }

    // method call syntax: "    research(problem);"
    const match = lineText.match(/^(\s+)(\w+)\((\w+)\);$/);
    if (match) {
      const indent = match[1];
      const funcName = match[2];
      const argName = match[3];

      let funcColor = "text-[#22863a]"; // Green method highlight
      if (phase === "executing" && idx === activeExecutionIndex) {
        funcColor = "text-blue-600 font-bold";
      } else if (phase === "completed" || (phase === "executing" && idx < activeExecutionIndex)) {
        funcColor = "text-emerald-600 font-semibold";
      }

      return (
        <span>
          <span className="whitespace-pre">{indent}</span>
          <span className={funcColor}>{funcName}</span>(
          <span className="text-[#e36209]">{argName}</span>);
        </span>
      );
    }

    return <span className="text-[#24292e]">{lineText}</span>;
  };

  return (
    <div
      ref={containerRef}
      className="p-6 sm:p-7 rounded-3xl bg-bg-surface border border-border-custom shadow-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col gap-6"
      aria-label="Engineering Workflow Simulator"
    >
      {/* Brand tag line */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent/80 rounded-l-3xl" />

      {/* Editor & Workflow Split Screen */}
      <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Editor (75% on Desktop lg / 70% on Tablet md) */}
        <div className="md:col-span-7 lg:col-span-3 rounded-2xl bg-[#F8FAFC] border border-neutral-200 overflow-hidden shadow-sm flex flex-col min-w-[320px]">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between bg-[#F1F5F9] border-b border-neutral-200 px-4 py-2 select-none">
            <div className="flex items-center gap-6">
              {/* VS Code Window Controls */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              </div>

              {/* Active Tab */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F8FAFC] rounded-t-xl border-t border-x border-neutral-200 font-mono text-xs text-neutral-600 font-medium">
                <span>📄</span>
                <span>solve.ts</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg border border-neutral-300/80 bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Copy code snippet"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>

          {/* Code Workspace with Line Numbers */}
          <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed relative min-h-[210px] flex flex-col justify-center bg-[#F8FAFC]">
            <div className="space-y-2 select-none">
              {typedLines.map((line, idx) => {
                const isCurrentLine = phase === "typing" ? idx === currentLineIndex : idx === activeExecutionIndex;
                
                // Line Highlight (Light Blue)
                let rowBg = "bg-transparent";
                if (phase === "executing" && idx === activeExecutionIndex) {
                  rowBg = "bg-blue-50/90 border-l-2 border-blue-500 -ml-[2px]";
                } else if (phase === "typing" && idx === currentLineIndex) {
                  rowBg = "bg-neutral-100/50 rounded";
                }

                return (
                  <div key={idx} className={`flex items-center min-h-[24px] transition-colors duration-150 ${rowBg} px-1.5`}>
                    <span className="text-[11px] text-neutral-400 w-6 inline-block select-none text-right pr-3">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-[#24292e] font-medium font-mono">
                      {renderSyntax(line, idx)}
                    </span>
                    {phase === "typing" && idx === currentLineIndex && (
                      <span className="w-1.5 h-4 bg-blue-600 ml-0.5 animate-pulse inline-block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Workflow Panel (25% on Desktop lg / 30% on Tablet md) */}
        <div className="md:col-span-3 lg:col-span-1 p-6 rounded-2xl bg-bg border border-border-custom flex flex-col justify-between min-h-[210px] min-w-[180px]">
          <div className="space-y-4">
            <div className="font-mono text-xs text-text-secondary uppercase tracking-widest border-b border-border-custom/40 pb-2.5 font-bold">
              Workflow
            </div>
            
            <div className="space-y-3 font-mono text-xs">
              {TASKS.map((task) => {
                const associatedLineIndex = CODE_LINES.findIndex((line) => line.includes(task.toLowerCase()));
                
                let stateText = "Pending";
                let stateSymbol = "○";
                let colorClass = "text-text-secondary/50";

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
                  <div key={task} className={`flex items-center justify-between py-0.5 ${colorClass}`}>
                    <span>{task}</span>
                    <span className="text-[10px] flex items-center gap-1.5">
                      <span className={stateSymbol === "⟳" ? "animate-spin inline-block" : ""}>{stateSymbol}</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-85">{stateText}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Build Completion Stats */}
          <AnimatePresence>
            {phase === "completed" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-5 pt-3 border-t border-border-custom/40 font-mono text-[10px] text-text-secondary space-y-1.5"
              >
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>✓ Build Successful</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tasks Completed</span>
                  <span className="text-text-primary font-semibold">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Execution Time</span>
                  <span className="text-text-primary font-semibold">0.42s</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

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
  const [activeTab, setActiveTab] = useState<"problems" | "output" | "debug" | "workflow">("workflow");
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
      className="p-5 sm:p-6 rounded-3xl bg-bg-surface border border-border-custom shadow-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-300 flex flex-col gap-5"
      aria-label="Engineering Workflow Simulator"
    >
      {/* Brand tag line */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent/80 rounded-l-3xl" />

      {/* Editor Container (Full Width) */}
      <div className="rounded-2xl bg-[#F8FAFC] border border-neutral-200 overflow-hidden shadow-sm flex flex-col w-full">
        
        {/* Editor Tab Header */}
        <div className="flex items-center justify-between bg-[#F1F5F9] border-b border-neutral-200 px-4 py-2 select-none">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            </div>

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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>

        {/* Code Workspace */}
        <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed relative min-h-[190px] flex flex-col justify-center bg-[#F8FAFC]">
          <div className="space-y-1.5 select-none">
            {typedLines.map((line, idx) => {
              const isCurrentLine = phase === "typing" ? idx === currentLineIndex : idx === activeExecutionIndex;
              
              let rowBg = "bg-transparent";
              if (phase === "executing" && idx === activeExecutionIndex) {
                rowBg = "bg-blue-50/90 border-l-2 border-blue-500 -ml-[2px]";
              } else if (phase === "typing" && idx === currentLineIndex) {
                rowBg = "bg-neutral-100/50 rounded";
              }

              return (
                <div key={idx} className={`flex items-center min-h-[22px] transition-colors duration-150 ${rowBg} px-1.5`}>
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

      {/* Terminal-Inspired Workflow Panel (Downside / Stacked vertically) */}
      <div className="border-t border-border-custom/50 pt-5 mt-1 flex flex-col gap-4">
        
        {/* Terminal Tab Header */}
        <div className="flex items-center gap-5 border-b border-border-custom/30 pb-2 text-[10px] sm:text-xs font-mono text-neutral-500 dark:text-text-secondary select-none overflow-x-auto scrollbar-none whitespace-nowrap">
          <button
            onClick={() => setActiveTab("problems")}
            className={`hover:text-text-primary dark:hover:text-white cursor-pointer transition-colors pb-2 -mb-[10px] ${
              activeTab === "problems" ? "text-blue-600 dark:text-accent border-b-2 border-blue-600 dark:border-accent font-bold" : ""
            }`}
          >
            Problems (0)
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`hover:text-text-primary dark:hover:text-white cursor-pointer transition-colors pb-2 -mb-[10px] ${
              activeTab === "output" ? "text-blue-600 dark:text-accent border-b-2 border-blue-600 dark:border-accent font-bold" : ""
            }`}
          >
            Output
          </button>
          <button
            onClick={() => setActiveTab("debug")}
            className={`hover:text-text-primary dark:hover:text-white cursor-pointer transition-colors pb-2 -mb-[10px] ${
              activeTab === "debug" ? "text-blue-600 dark:text-accent border-b-2 border-blue-600 dark:border-accent font-bold" : ""
            }`}
          >
            Debug Console
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`hover:text-text-primary dark:hover:text-white cursor-pointer transition-colors pb-2 -mb-[10px] ${
              activeTab === "workflow" ? "text-blue-600 dark:text-accent border-b-2 border-blue-600 dark:border-accent font-bold" : ""
            }`}
          >
            Workflow Terminal
          </button>
        </div>

        {/* Panel Content (Stacked layout to prevent sidebar grid overlapping) */}
        <div className="min-h-[140px] flex flex-col justify-between">
          
          {activeTab === "workflow" && (
            <div className="flex flex-col gap-4">
              {/* Tasks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-[10px] sm:text-xs">
                {TASKS.map((task) => {
                  const associatedLineIndex = CODE_LINES.findIndex((line) => line.includes(task.toLowerCase()));
                  
                  let stateText = "Pending";
                  let stateSymbol = "○";
                  let cardBg = "bg-neutral-50 dark:bg-white/[0.02]";
                  let borderClass = "border-neutral-200 dark:border-border-custom/40";
                  let textClass = "text-neutral-500 dark:text-text-secondary/60";

                  if (phase === "executing") {
                    if (associatedLineIndex === activeExecutionIndex) {
                      stateSymbol = "⟳";
                      stateText = "Running";
                      cardBg = "bg-blue-50 dark:bg-blue-950/20";
                      borderClass = "border-blue-200 dark:border-blue-500/30";
                      textClass = "text-blue-600 dark:text-blue-400 font-bold animate-pulse";
                    } else if (associatedLineIndex < activeExecutionIndex) {
                      stateSymbol = "✓";
                      stateText = "Done";
                      cardBg = "bg-emerald-50/55 dark:bg-emerald-950/10";
                      borderClass = "border-emerald-200 dark:border-emerald-500/20";
                      textClass = "text-emerald-600 dark:text-emerald-400 font-semibold";
                    }
                  } else if (phase === "completed") {
                    stateSymbol = "✓";
                    stateText = "Done";
                    cardBg = "bg-emerald-50/55 dark:bg-emerald-950/10";
                    borderClass = "border-emerald-200 dark:border-emerald-500/20";
                    textClass = "text-emerald-600 dark:text-emerald-400 font-semibold";
                  }

                  return (
                    <div key={task} className={`flex flex-col p-3 rounded-xl border justify-between gap-1.5 transition-all duration-300 ${cardBg} ${borderClass} ${textClass}`}>
                      <span className="font-semibold uppercase tracking-wider text-[9px] opacity-75">{task}</span>
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px]">
                        <span className={stateSymbol === "⟳" ? "animate-spin inline-block" : ""}>{stateSymbol}</span>
                        <span className="uppercase tracking-widest text-[8px] font-bold opacity-90">{stateText}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Build Completion Stats (Full Width below Tasks) */}
              <div className="min-h-[60px]">
                <AnimatePresence>
                  {phase === "completed" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/[0.04] border border-emerald-200 dark:border-emerald-500/20 font-mono text-[10px] sm:text-xs text-neutral-600 dark:text-text-secondary space-y-2 shadow-sm"
                    >
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                        <span>✓ Build Successful</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between border-r border-neutral-200 dark:border-border-custom/40 pr-4">
                          <span>Tasks Done</span>
                          <span className="text-neutral-900 dark:text-text-primary font-bold">6/6</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Duration</span>
                          <span className="text-neutral-900 dark:text-text-primary font-bold">0.42s</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {activeTab === "problems" && (
            <div className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 p-2 space-y-1 min-h-[100px] flex items-center justify-center">
              <span>No problems have been detected in this workspace.</span>
            </div>
          )}

          {activeTab === "output" && (
            <div className="font-mono text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.01] border border-neutral-200 dark:border-border-custom/30 space-y-1.5 select-text min-h-[110px] text-left">
              <div>[system] Initializing compiler...</div>
              {phase === "typing" && <div>[info] Typing solve.ts logic (line {currentLineIndex + 1}/{CODE_LINES.length})...</div>}
              {(phase === "executing" || phase === "completed") && (
                <>
                  <div className="text-emerald-600 dark:text-emerald-400">[success] Compilation successful.</div>
                  <div className="text-blue-500">[exec] Running execution pipeline solve(problem)...</div>
                  {TASKS.map((task, idx) => {
                    const lineIdx = idx + 1;
                    if (phase === "executing" && lineIdx === activeExecutionIndex) {
                      return <div key={task} className="text-blue-600 dark:text-blue-400 animate-pulse ml-2">[running] {task.toLowerCase()}()...</div>;
                    }
                    if (phase === "completed" || (phase === "executing" && lineIdx < activeExecutionIndex)) {
                      return <div key={task} className="text-emerald-600 dark:text-emerald-500 ml-2">✓ {task.toLowerCase()}() completed successfully.</div>;
                    }
                    return null;
                  })}
                </>
              )}
              {phase === "completed" && (
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">✓ Build complete: 6 steps finalized.</div>
              )}
            </div>
          )}

          {activeTab === "debug" && (
            <div className="font-mono text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.01] border border-neutral-200 dark:border-border-custom/30 space-y-1 select-text min-h-[110px] text-left">
              <div className="text-neutral-400">&gt; Initial state: active = false</div>
              {phase === "typing" && <div className="text-yellow-600 dark:text-yellow-500">&gt; Warning: solve is not fully defined yet</div>}
              {phase === "executing" && (
                <>
                  <div className="text-blue-600 dark:text-blue-400">&gt; Calling solve(problem)</div>
                  <div className="text-neutral-500">&gt; Current active call index: {activeExecutionIndex}</div>
                </>
              )}
              {phase === "completed" && (
                <>
                  <div className="text-emerald-600 dark:text-emerald-400">&gt; Calling solve(problem)</div>
                  <div className="text-emerald-600 dark:text-emerald-400">&gt; Return state: success (6 tasks completed)</div>
                </>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

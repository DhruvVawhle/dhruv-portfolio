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
    const delay = Math.floor(Math.random() * 20) + 45; // 45-65ms typing speed

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

  // Light VS Code Syntax Highlighting Helper
  const renderSyntax = (lineText: string, isCurrentLine: boolean, idx: number) => {
    // If the line is empty or just typing
    if (!lineText) return <span>&nbsp;</span>;

    // Split function and keyword
    if (lineText.includes("function")) {
      return (
        <span>
          <span className="text-blue-600 font-semibold">function</span>{" "}
          <span className="text-purple-600">solve</span>(
          <span className="text-orange-600">problem</span>) &#123;
        </span>
      );
    }

    if (lineText.includes("}")) {
      return <span>&#125;</span>;
    }

    // Match "    research(problem);"
    const match = lineText.match(/^(\s+)(\w+)\((\w+)\);$/);
    if (match) {
      const indent = match[1];
      const funcName = match[2];
      const argName = match[3];

      let funcColor = "text-yellow-600"; // default light VS Code function call
      if (phase === "executing" && idx === activeExecutionIndex) {
        funcColor = "text-blue-600 font-bold";
      } else if (phase === "completed" || (phase === "executing" && idx < activeExecutionIndex)) {
        funcColor = "text-emerald-600 font-semibold";
      }

      return (
        <span>
          <span className="whitespace-pre">{indent}</span>
          <span className={funcColor}>{funcName}</span>(
          <span className="text-orange-600">{argName}</span>);
        </span>
      );
    }

    return <span>{lineText}</span>;
  };

  return (
    <div
      ref={containerRef}
      className="p-6 sm:p-7 rounded-3xl bg-bg-surface border border-border-custom shadow-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
      aria-label="Engineering Workflow Simulator"
    >
      {/* Subtle brand tag indicator */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent/80 rounded-l-3xl" />

      {/* Header Bar */}
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

      {/* Grid: 75% / 25% on desktop (md:col-span-3 and md:col-span-1), stacks on mobile (<768px) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        
        {/* Light VS Code Editor Panel (Left 75% on desktop / md:col-span-3) */}
        <div className="md:col-span-3 rounded-2xl bg-[#F8F9FA] border border-neutral-200 overflow-hidden shadow-inner flex flex-col">
          
          {/* VS Code Tab Header */}
          <div className="flex items-center bg-[#EAECEF] border-b border-neutral-200 px-3 py-1.5 select-none">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5 mr-4">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            </div>

            {/* active tab */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] rounded-t-lg border-t border-x border-neutral-300/80 font-mono text-[10px] sm:text-xs text-neutral-700 font-medium">
              <span className="text-yellow-600 font-bold text-[9px] uppercase">JS</span>
              <span>solve.js</span>
            </div>
          </div>

          {/* Code Workspace Editor Area */}
          <div className="p-5 font-mono text-[11px] sm:text-xs leading-relaxed relative min-h-[190px] flex flex-col justify-center bg-[#F8F9FA]">
            <div className="space-y-1.5 select-none">
              {typedLines.map((line, idx) => {
                const isCurrentLine = phase === "typing" ? idx === currentLineIndex : idx === activeExecutionIndex;
                
                // Row line background highlight
                let rowBg = "bg-transparent";
                if (phase === "executing" && idx === activeExecutionIndex) {
                  rowBg = "bg-blue-50/90 border-l-2 border-blue-500 -ml-[2px]";
                } else if (phase === "typing" && idx === currentLineIndex) {
                  rowBg = "bg-neutral-100/60 rounded";
                }

                return (
                  <div key={idx} className={`flex items-center min-h-[22px] transition-colors duration-200 ${rowBg} px-1`}>
                    {/* VS Code Line Number */}
                    <span className="text-[10px] text-neutral-400 w-5 inline-block select-none text-right pr-2.5">
                      {idx + 1}
                    </span>
                    
                    {/* Rendered Colored Code text */}
                    <span className="flex-1 text-neutral-800">
                      {renderSyntax(line, isCurrentLine, idx)}
                    </span>

                    {/* Blinking typing cursor */}
                    {phase === "typing" && idx === currentLineIndex && (
                      <span className="w-1.5 h-3.5 bg-blue-600 ml-0.5 animate-pulse inline-block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Workflow Execution Panel (Right 25% on desktop / md:col-span-1) */}
        <div className="md:col-span-1 p-5 rounded-2xl bg-bg border border-border-custom flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="font-mono text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-wider mb-4 border-b border-border-custom/40 pb-2.5 flex justify-between">
              <span>Status</span>
              <span className="text-accent font-bold">
                {phase === "completed" ? "SUCCESS" : "ACTIVE"}
              </span>
            </div>
            
            <div className="space-y-3 font-mono text-[11px] sm:text-xs">
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
                    <span className="truncate pr-2">{task}</span>
                    <span className="text-[10px] flex items-center gap-1.5 flex-shrink-0">
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

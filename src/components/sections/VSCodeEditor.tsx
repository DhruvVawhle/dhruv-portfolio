"use client";

import React, { useEffect, useState, useRef } from "react";
import { WORKFLOW_HEADER_CODE, WORKFLOW_STEPS } from "@/data/engineeringWorkflow";
import { renderHighlightedLine } from "@/components/sections/syntaxHighlighter";

interface VSCodeEditorProps {
  activeStepCount: number; // 0 to 7
  isTyping: boolean;
  onTypingComplete?: () => void;
}

export default function VSCodeEditor({
  activeStepCount,
}: VSCodeEditorProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const prevStepCountRef = useRef<number>(0);
  const editorBodyRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  // Compute the target full code for the given step count
  const buildFullTargetCode = (stepCount: number): string => {
    const lines = [...WORKFLOW_HEADER_CODE];
    const stepsToInclude = WORKFLOW_STEPS.slice(0, stepCount);

    stepsToInclude.forEach((step) => {
      lines.push(...step.defCode);
      lines.push("");
    });

    if (stepsToInclude.length > 0) {
      lines.push("// Execution Pipeline:");
      stepsToInclude.forEach((step) => {
        lines.push(...step.callCode);
      });
      lines.push("");
    }

    return lines.join("\n");
  };

  // Run code safely via JS transpilation simulation
  const executeCodeSafely = (codeToRun: string, stepCount: number) => {
    if (stepCount === 0) {
      setTerminalLogs([]);
      setHasError(false);
      return;
    }

    try {
      // Strip TS types for clean execution
      const cleanJs = codeToRun
        .replace(/\/\*\*[\s\S]*?\*\//g, "")
        .replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, "")
        .replace(/:\s*Problem/g, "")
        .replace(/:\s*string/g, "")
        .replace(/:\s*number/g, "")
        .replace(/:\s*boolean/g, "")
        .replace(/:\s*\{[\s\S]*?\}/g, "");

      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.join(" ")),
        error: (...args: any[]) => {
          logs.push("ERR: " + args.join(" "));
          setHasError(true);
        },
      };

      // Execute safely in isolated Function constructor
      const runner = new Function("console", cleanJs);
      runner(customConsole);

      setTerminalLogs(logs);
      setHasError(false);
    } catch (err: any) {
      setTerminalLogs((prev) => [...prev, `TypeError: ${err.message}`]);
      setHasError(true);
    }
  };

  // Code generation & typing loop (6 chars per frame)
  useEffect(() => {
    const targetCode = buildFullTargetCode(activeStepCount);

    // If scrolling up or reduced motion: instant update
    if (activeStepCount < prevStepCountRef.current || prefersReducedMotion) {
      setDisplayedText(targetCode);
      setIsTypingActive(false);
      executeCodeSafely(targetCode, activeStepCount);
      prevStepCountRef.current = activeStepCount;
      return;
    }

    // Step increased: start typing only the new portion
    if (activeStepCount > prevStepCountRef.current) {
      setIsTypingActive(true);
      let currentLength = displayedText.length;
      let animId: number;

      const typeFrame = () => {
        if (currentLength < targetCode.length) {
          currentLength = Math.min(targetCode.length, currentLength + 6);
          setDisplayedText(targetCode.slice(0, currentLength));

          if (editorBodyRef.current) {
            editorBodyRef.current.scrollTop = editorBodyRef.current.scrollHeight;
          }

          animId = requestAnimationFrame(typeFrame);
        } else {
          setIsTypingActive(false);
          executeCodeSafely(targetCode, activeStepCount);
        }
      };

      animId = requestAnimationFrame(typeFrame);
      prevStepCountRef.current = activeStepCount;

      return () => {
        cancelAnimationFrame(animId);
      };
    }

    // Initial mount
    if (displayedText === "") {
      setDisplayedText(targetCode);
      executeCodeSafely(targetCode, activeStepCount);
    }
  }, [activeStepCount, prefersReducedMotion]);

  const displayedLines = displayedText.split("\n");

  return (
    <div
      aria-label="Interactive VS Code editor simulating the engineering execution pipeline"
      className="@container flex flex-col w-full h-[540px] sm:h-[580px] lg:h-[620px] rounded-2xl bg-[#1e1e1e] border border-[#333333] shadow-2xl overflow-hidden text-xs font-mono select-none"
    >
      {/* 1. Title Bar */}
      <div className="h-8.5 bg-[#323233] border-b border-[#252526] px-3 flex items-center justify-between text-[#cccccc]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 text-[11px] text-[#969696] hidden @[400px]:inline">
            solve.ts — portfolio-engine
          </span>
        </div>
        <div className="text-[11px] text-[#858585] font-sans">Visual Studio Code</div>
      </div>

      {/* Editor Main Section (Activity Bar + Sidebar + Editor Tabs + Code) */}
      <div className="flex flex-1 min-h-0">
        {/* Activity Bar (Hidden on narrow screens via container query) */}
        <div className="w-10 bg-[#333333] border-r border-[#252526] py-2 hidden @[560px]:flex flex-col items-center gap-4 text-[#858585]">
          <div className="text-white hover:text-white cursor-pointer" title="Explorer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
          </div>
          <div className="hover:text-white cursor-pointer" title="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div className="hover:text-white cursor-pointer" title="Source Control">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
          </div>
        </div>

        {/* Explorer Sidebar (Hidden on narrow screens via container query) */}
        <div className="w-40 bg-[#252526] border-r border-[#1e1e1e] p-2 text-[#cccccc] hidden @[640px]:block">
          <div className="text-[10px] uppercase font-bold text-[#bbbbbb] tracking-wider mb-2">
            PORTFOLIO
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#cccccc]">
              <span>▼</span>
              <span>src</span>
            </div>
            <div className="pl-4 flex items-center gap-1.5 text-[#3b82f6] font-semibold bg-[#37373d]/40 rounded px-1">
              <span className="text-[#3b82f6]">TS</span>
              <span>solve.ts</span>
            </div>
            <div className="pl-4 flex items-center gap-1.5 text-[#858585]">
              <span>{}</span>
              <span>package.json</span>
            </div>
            <div className="pl-4 flex items-center gap-1.5 text-[#858585]">
              <span>{}</span>
              <span>tsconfig.json</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#333333] text-[10px] uppercase font-bold text-[#858585]">
            OUTLINE
          </div>
          <div className="mt-1 space-y-0.5 text-[10px] text-[#858585]">
            {WORKFLOW_STEPS.slice(0, activeStepCount).map((s) => (
              <div key={s.id} className="truncate">
                • {s.fnName}()
              </div>
            ))}
          </div>
        </div>

        {/* Editor Central Pane */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          {/* Tab Bar */}
          <div className="h-8 bg-[#2d2d2d] border-b border-[#252526] flex items-center">
            <div className="h-full bg-[#1e1e1e] border-t-2 border-[#007acc] px-3 flex items-center gap-2 text-[#ffffff] text-[11px]">
              <span className="text-[#3b82f6] font-bold text-[10px]">TS</span>
              <span>solve.ts</span>
              <span className="text-[#858585] text-[10px]">×</span>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="h-6 bg-[#1e1e1e] px-3 border-b border-[#252526] flex items-center gap-1 text-[10px] text-[#858585]">
            <span>src</span>
            <span>›</span>
            <span>solve.ts</span>
            <span>›</span>
            <span className="text-[#cccccc]">pipeline</span>
          </div>

          {/* Code Lines with Line Numbers & Caret */}
          <div
            ref={editorBodyRef}
            className="flex-1 overflow-y-auto p-2 text-[#d4d4d4] font-mono leading-relaxed"
          >
            {displayedLines.map((line, idx) => {
              const isCurrentLine = idx === displayedLines.length - 1;
              return (
                <div
                  key={idx}
                  className={`flex items-start ${
                    isCurrentLine ? "bg-[#282828]" : ""
                  }`}
                >
                  <span className="w-8 text-right pr-3 select-none text-[#5c6370] text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="flex-1 whitespace-pre-wrap break-all text-[11px]">
                    {renderHighlightedLine(line)}
                    {isCurrentLine && isTypingActive && !prefersReducedMotion && (
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-[#007acc] animate-pulse align-middle" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Terminal Output Panel */}
          <div className="h-28 sm:h-32 bg-[#181818] border-t border-[#333333] flex flex-col">
            <div className="h-6 px-3 bg-[#252526] flex items-center justify-between text-[10px] text-[#969696]">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold border-b border-[#007acc] pb-0.5">
                  TERMINAL
                </span>
                <span>OUTPUT</span>
                <span>DEBUG CONSOLE</span>
              </div>
            </div>
            <div
              aria-live="polite"
              className="flex-1 overflow-y-auto p-2 text-[10px] font-mono text-[#cccccc] space-y-0.5"
            >
              {terminalLogs.length === 0 ? (
                <span className="text-[#555555]">
                  {activeStepCount === 0
                    ? "$ ts-node src/solve.ts (awaiting execution trigger...)"
                    : "Executing solve.ts pipeline..."}
                </span>
              ) : (
                terminalLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={
                      log.startsWith("ERR")
                        ? "text-red-400 font-semibold"
                        : log.startsWith("✓")
                        ? "text-emerald-400 font-semibold"
                        : "text-[#9cdcfe]"
                    }
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Blue VS Code Status Bar */}
      <div
        className={`h-5 px-2 flex items-center justify-between text-[10px] text-white transition-colors duration-300 ${
          hasError ? "bg-[#c72e2e]" : "bg-[#007acc]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span>main*</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            Ln {displayedLines.length}, Col {displayedLines[displayedLines.length - 1]?.length || 1}
          </span>
          <span className="hidden @[450px]:inline">Spaces: 2</span>
          <span className="hidden @[450px]:inline">UTF-8</span>
          <span>TypeScript</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import { getTechWebsite } from "@/lib/techUrls";
import { usePointerTilt } from "@/components/sections/project-showcase/hooks";

export interface TechDetailInfo {
  category: string;
  categoryColor: string;
  role: string;
  projectsList: string[];
  useCases: string[];
  architecture: string;
  keyPatterns: string[];
}

interface SkillInspectorPanelProps {
  activeTech: string;
  activeDetail: TechDetailInfo;
  connectedTechs: string[];
  shouldReduceMotion: boolean;
  onClose: () => void;
  onSelectTech: (tech: string) => void;
}

export default function SkillInspectorPanel({
  activeTech,
  activeDetail,
  connectedTechs,
  shouldReduceMotion,
  onClose,
  onSelectTech,
}: SkillInspectorPanelProps) {
  const { cardRef, handlePointerMove, handlePointerLeave } =
    usePointerTilt(shouldReduceMotion);

  return (
    <motion.div
      key={`panel-${activeTech}`}
      onClick={(e) => e.stopPropagation()}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 24, scale: 0.97 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full lg:w-[440px] flex-shrink-0 z-40 mb-4 lg:mb-0"
    >
      <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            transform: shouldReduceMotion
              ? undefined
              : "perspective(1100px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
            transition: shouldReduceMotion
              ? undefined
              : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease",
          }}
          className="group relative p-6 sm:p-7 rounded-3xl bg-[#161B22]/95 border border-[#3B82F6]/45 shadow-2xl backdrop-blur-xl space-y-5 overflow-hidden will-change-transform"
        >
          {!shouldReduceMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.12), transparent 65%)",
              }}
            />
          )}

          {/* Header */}
          <div className="relative z-20 flex items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <TechIcon name={activeTech} size="lg" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white truncate">
                  {activeTech}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium border"
                    style={{
                      color: activeDetail.categoryColor,
                      borderColor: `${activeDetail.categoryColor}40`,
                      backgroundColor: `${activeDetail.categoryColor}16`,
                    }}
                  >
                    {activeDetail.category}
                  </span>
                  <a
                    href={getTechWebsite(activeTech)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit official ${activeTech} website`}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[11px] text-[#3B82F6] hover:text-white bg-[#3B82F6]/10 hover:bg-[#3B82F6]/25 border border-[#3B82F6]/30 transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                  >
                    <span>Docs</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close technology inspector"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Role */}
          <div className="relative z-20 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <span className="text-white/55 text-xs block">Primary engineering role</span>
            <span className="text-[#3B82F6] font-semibold text-sm sm:text-base block">
              {activeDetail.role}
            </span>
          </div>

          {/* Core Capabilities */}
          <div className="relative z-20 space-y-2.5">
            <span className="text-xs text-white/65 block font-medium">
              Core capabilities
            </span>
            <ul className="space-y-1.5">
              {activeDetail.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="px-3 py-2 rounded-xl bg-[#111827] border border-white/10 font-mono text-xs text-white/90 flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0" />
                  <span className="truncate">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="relative z-20 pt-3 border-t border-white/10">
            <span className="text-xs text-white/65 block mb-2 font-medium">
              Used in production projects
            </span>
            <div className="flex flex-wrap gap-2">
              {activeDetail.projectsList.map((proj) => (
                <a
                  key={proj}
                  href="#projects"
                  className="px-3 py-1.5 min-h-[36px] inline-flex items-center gap-1.5 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 font-mono text-xs font-medium text-white/95 hover:bg-[#3B82F6]/25 hover:border-[#3B82F6]/50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                >
                  <span>{proj}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connected Ecosystem */}
          {connectedTechs.length > 0 && (
            <div className="relative z-20 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
              <span className="font-mono text-xs text-emerald-400 font-medium block">
                Connected ecosystem
              </span>
              <div className="flex flex-wrap gap-1.5">
                {connectedTechs.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => onSelectTech(tech)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 font-mono text-[11px] text-white/90 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import { usePointerTilt } from "@/components/sections/project-showcase/hooks";

export interface TechCardItem {
  name: string;
  descriptor: string;
  proficiency?: number;
  yearsOfExperience?: number;
}

export interface StackCategory {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  accentClass: string;
  technologies: TechCardItem[];
}

interface DomainCategoryCardProps {
  category: StackCategory;
  index: number;
  activeTech: string | null;
  shouldReduceMotion: boolean;
  onSelectTech: (name: string, e?: React.MouseEvent) => void;
}

function DomainCategoryCard({
  category,
  index,
  activeTech,
  shouldReduceMotion,
  onSelectTech,
}: DomainCategoryCardProps) {
  const { cardRef, handlePointerMove, handlePointerLeave } =
    usePointerTilt(shouldReduceMotion);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.2),
      }}
      className="transition-transform duration-200 ease-out hover:-translate-y-0.5 h-full"
    >
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
            : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, background-color 200ms ease",
        }}
        className="group/cat relative p-7 sm:p-8 rounded-3xl bg-[#161B22] border border-white/10 hover:bg-[#19202B] hover:border-[#3B82F6]/45 shadow-lg flex flex-col justify-between h-full overflow-hidden will-change-transform"
      >
        {!shouldReduceMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.09), transparent 65%)",
            }}
          />
        )}

        <div className="relative z-10 flex items-baseline justify-between gap-3 pb-5 mb-6 border-b border-white/10">
          <div>
            <h4
              className="font-display font-bold text-2xl"
              style={{ color: category.accentColor }}
            >
              {category.title}
            </h4>
            <p className="text-xs font-mono text-white/60 mt-1">
              {category.subtitle}
            </p>
          </div>
          <span className="font-mono text-xs text-white/50 flex-shrink-0">
            {category.technologies.length}
          </span>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3.5 flex-grow">
          {category.technologies.map((tech) => {
            const isCardActive = activeTech === tech.name;
            return (
              <button
                key={tech.name}
                type="button"
                onClick={(e) => onSelectTech(tech.name, e)}
                aria-pressed={isCardActive}
                aria-label={`${tech.name}: ${tech.descriptor}`}
                className={`group/card p-4 rounded-2xl border text-left transition-[transform,background-color,border-color] duration-200 ease-out transform-gpu flex flex-col justify-between h-full min-h-[120px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                  isCardActive
                    ? "bg-[#1C2333] border-[#3B82F6] -translate-y-0.5 ring-2 ring-[#3B82F6]/25"
                    : "bg-[#111827] border-white/10 hover:bg-[#1C2333] hover:border-[#3B82F6]/50 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 ease-out transform-gpu flex-shrink-0 border group-hover/card:scale-105"
                    style={{
                      backgroundColor: isCardActive
                        ? "rgba(59,130,246,0.16)"
                        : "rgba(255, 255, 255, 0.04)",
                      borderColor: isCardActive
                        ? "#3B82F6"
                        : "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <TechIcon name={tech.name} size="md" />
                  </div>
                  <span
                    className={`font-display font-bold text-sm sm:text-base transition-colors duration-150 ${
                      isCardActive ? "text-[#3B82F6]" : "text-white"
                    }`}
                  >
                    {tech.name}
                  </span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-mono">
                  {tech.descriptor}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

interface SkillDomainGridProps {
  categories: StackCategory[];
  activeTech: string | null;
  mobileOpenCategory: string | null;
  setMobileOpenCategory: (id: string | null) => void;
  shouldReduceMotion: boolean;
  onSelectTech: (name: string, e?: React.MouseEvent) => void;
}

export default function SkillDomainGrid({
  categories,
  activeTech,
  mobileOpenCategory,
  setMobileOpenCategory,
  shouldReduceMotion,
  onSelectTech,
}: SkillDomainGridProps) {
  return (
    <motion.div
      id="technical-architecture-cards"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden pt-6"
    >
      <div className="pt-8 border-t border-white/10 space-y-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs text-[#3B82F6] font-medium block mb-1.5">
            System architecture breakdown
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Technical Domain Stack
          </h3>
        </div>

        {/* Mobile Accordion View (< lg) */}
        <div className="block lg:hidden space-y-3.5">
          {categories.map((category) => {
            const isOpen = mobileOpenCategory === category.id;
            return (
              <div
                key={`mobile-cat-${category.id}`}
                className="rounded-3xl bg-[#161B22] border border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpenCategory(isOpen ? null : category.id);
                  }}
                  aria-expanded={isOpen}
                  className="w-full min-h-[56px] px-5 py-4 flex items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-[#3B82F6] cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.accentColor }}
                    />
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-base text-white truncate">
                        {category.title}
                      </h4>
                      <p className="font-mono text-xs text-white/60 truncate mt-0.5">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#3B82F6] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-2 border-t border-white/10 grid grid-cols-1 gap-2.5">
                        {category.technologies.map((tech) => {
                          const isCardActive = activeTech === tech.name;
                          return (
                            <button
                              type="button"
                              key={`mobile-tech-${tech.name}`}
                              onClick={(e) => onSelectTech(tech.name, e)}
                              aria-pressed={isCardActive}
                              className={`w-full text-left p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                                isCardActive
                                  ? "bg-[#1C2333] border-[#3B82F6]"
                                  : "bg-[#111827] border-white/10 hover:border-[#3B82F6]/50"
                              }`}
                            >
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                <TechIcon name={tech.name} size="md" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-display font-bold text-sm text-white">
                                  {tech.name}
                                </h5>
                                <p className="font-mono text-xs text-white/70 leading-relaxed mt-0.5">
                                  {tech.descriptor}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop 2-Column Grid (>= lg) */}
        <div className="hidden lg:grid grid-cols-2 gap-6 items-stretch">
          {categories.map((category, index) => (
            <DomainCategoryCard
              key={category.id}
              category={category}
              index={index}
              activeTech={activeTech}
              shouldReduceMotion={shouldReduceMotion}
              onSelectTech={onSelectTech}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

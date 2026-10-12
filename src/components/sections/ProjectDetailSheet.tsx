"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ShowcaseProject } from "@/data/showcaseProjects";
import TechIcon from "@/components/ui/TechIcon";

interface ProjectDetailSheetProps {
  project: ShowcaseProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailSheet({
  project,
  isOpen,
  onClose,
}: ProjectDetailSheetProps) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause Lenis and lock scroll while open
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
    }

    return () => {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sheet-project-title"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal / Sheet Content with Spring Animation */}
          <motion.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-bg-surface border border-border-custom rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Sheet Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border-custom/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-secondary">
                  Status: {project.status}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close project detail sheet"
                className="w-9 h-9 rounded-full border border-border-custom bg-bg hover:bg-foreground/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Sheet Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h2 id="sheet-project-title" className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-1 font-mono text-xs sm:text-sm text-accent font-medium">
                  {project.subtitle}
                </p>

                {/* Project Screenshot / Architecture Diagram Preview */}
                {!project.isGitHubCard && project.image && (
                  <div className="mt-4 relative w-full h-56 sm:h-64 rounded-2xl border border-border-custom bg-bg/40 overflow-hidden flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Blue Metric Boxes */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
                    Key Performance Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col justify-between"
                      >
                        <span className="font-mono text-[11px] text-text-secondary uppercase">
                          {m.label}
                        </span>
                        <div className="mt-1 font-display font-extrabold text-lg sm:text-xl text-accent">
                          {m.value}{" "}
                          {m.suffix && (
                            <span className="text-xs font-sans font-normal text-text-secondary">
                              {m.suffix}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stack Chips */}
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
                  Technologies &amp; Architecture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg border border-border-custom font-mono text-xs text-text-primary"
                    >
                      <TechIcon name={tech} size="sm" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sheet Footer with Action Buttons */}
            <div className="p-6 pt-4 border-t border-border-custom/80 bg-bg/50 flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-text-primary text-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub Repo</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-mono text-xs font-semibold hover:bg-accent/90 transition-colors shadow-xs"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Live Demo</span>
                </a>
              )}

              {project.extraLinks?.map((extra) => (
                <a
                  key={extra.label}
                  href={extra.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-border-custom hover:border-accent text-text-secondary hover:text-text-primary font-mono text-xs transition-colors"
                >
                  <span>{extra.label} ↗</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

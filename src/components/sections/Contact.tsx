"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { CONNECT_PROFILES } from "@/data/credentialsAndConnect";
import ConversationDialog from "@/components/sections/ConversationDialog";
import { useSimpleToast, copyToClipboard } from "@/components/ui/SimpleToast";

export default function Contact() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [istTime, setIstTime] = useState("");
  const { showToast } = useSimpleToast();

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Live clock for Asia/Kolkata updating every 20 seconds
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(now);
        setIstTime(`${formatted} IST`);
      } catch (err) {
        setIstTime("Asia/Kolkata");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-500);
    mouseY.set(-500);
  };

  const handleCopyProfile = async (label: string, url: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      showToast(`${label} URL copied to clipboard`);
    } else {
      showToast(`Failed to copy ${label} URL`);
    }
  };

  return (
    <section id="contact" className="py-[var(--section-padding-y)] bg-bg" aria-label="Connect Section">
      <div className="content-width">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Connect / engineering collaboration
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Engineering Collaboration
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Open to software engineering roles (2027)
            </span>
          </div>

          {/* Large Card with cursor-following blue glow */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative p-8 sm:p-12 lg:p-16 rounded-3xl bg-bg-surface border border-border-custom hover:border-accent/50 shadow-xl overflow-hidden group transition-all duration-500"
          >
            {/* Cursor-following blue glow */}
            <motion.div
              style={{
                left: mouseX,
                top: mouseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="pointer-events-none absolute w-[450px] h-[450px] rounded-full bg-blue-500/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="relative z-10 max-w-3xl">
              {/* Chips row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for 2027 engineering roles</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/5 border border-border-custom text-text-secondary text-xs font-mono">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Mumbai, Maharashtra, India</span>
                </div>

                {istTime && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-foreground/5 border border-border-custom text-text-secondary text-xs font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{istTime}</span>
                  </div>
                )}
              </div>

              {/* Heading and text verbatim */}
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
                Let&apos;s build reliable software together.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                Whether you are hiring for your engineering team or looking to discuss full-stack architecture and applied AI systems, I am available for 2027 engineering opportunities.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-mono text-sm font-bold shadow-md hover:shadow-xl hover:shadow-accent/25 hover:bg-accent/90 transition-all duration-300 cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Start a conversation</span>
                </button>

                <a
                  href="/resume.pdf"
                  download="Dhruv_Vawhle_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border-custom bg-bg-surface hover:border-accent hover:bg-accent/5 text-text-primary font-mono text-sm font-medium transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download resume</span>
                </a>
              </div>

              {/* Row: Verified Profiles */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border-custom/60">
                <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                  Verified profiles:
                </span>

                {CONNECT_PROFILES.map((profile) => (
                  <div key={profile.label} className="flex items-center gap-2">
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                    >
                      <span>{profile.label} ↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyProfile(profile.label, profile.url)}
                      aria-label={`Copy ${profile.label} URL`}
                      className="p-1.5 rounded-lg hover:bg-foreground/5 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Start A Conversation Modal Dialog */}
      <ConversationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
}

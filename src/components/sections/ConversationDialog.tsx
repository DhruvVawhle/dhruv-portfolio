"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { CONNECT_PROFILES, EMAIL_ADDRESS } from "@/data/credentialsAndConnect";
import { useSimpleToast, copyToClipboard } from "@/components/ui/SimpleToast";

interface ConversationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConversationDialog({ isOpen, onClose }: ConversationDialogProps) {
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { showToast } = useSimpleToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async (label: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      showToast(`${label} copied to clipboard`);
    } else {
      showToast(`Failed to copy ${label}`);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="conversation-dialog-title"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-lg bg-bg-surface border border-border-custom rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-custom/80">
              <div>
                <h3 id="conversation-dialog-title" className="font-display font-bold text-xl text-text-primary">
                  Start a conversation
                </h3>
                <p className="font-mono text-xs text-text-secondary mt-0.5">
                  Connect directly across verified professional platforms.
                </p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close conversation dialog"
                className="w-9 h-9 rounded-full border border-border-custom bg-bg hover:bg-foreground/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Platform Items */}
            <div className="space-y-4">
              {CONNECT_PROFILES.map((profile) => (
                <div
                  key={profile.label}
                  className="p-4 rounded-2xl bg-bg border border-border-custom flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0">
                      {profile.label === "LinkedIn" ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-text-primary">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-base text-text-primary block leading-tight">
                        {profile.label}
                      </span>
                      <span className="font-mono text-[11px] text-text-secondary truncate block max-w-[170px] sm:max-w-xs mt-0.5">
                        {profile.url}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(profile.label, profile.url)}
                      aria-label={`Copy ${profile.label} URL`}
                      className="px-3 py-1.5 rounded-xl border border-border-custom bg-bg-surface hover:bg-foreground/5 font-sans text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      Copy
                    </button>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-accent text-white font-sans text-xs font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Open ↗
                    </a>
                  </div>
                </div>
              ))}

              {/* Email Address Section when provided */}
              {EMAIL_ADDRESS ? (
                <div className="p-4 rounded-2xl bg-bg border border-border-custom flex items-center justify-between gap-3 shadow-xs">
                  <div>
                    <span className="font-display font-bold text-base text-text-primary block">
                      Email
                    </span>
                    <span className="font-mono text-[11px] text-text-secondary truncate block">
                      {EMAIL_ADDRESS}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy("Email", EMAIL_ADDRESS!)}
                      aria-label="Copy Email address"
                      className="px-3 py-1.5 rounded-xl border border-border-custom bg-bg-surface hover:bg-foreground/5 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      Copy
                    </button>
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="px-3 py-1.5 rounded-xl bg-accent text-white font-mono text-xs font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Mail ↗
                    </a>
                  </div>

                </div>
              ) : (
                /* EMAIL_ADDRESS: TODO placeholder note when address is not provided */
                <div className="p-3.5 rounded-2xl border border-dashed border-border-custom text-center font-mono text-xs text-text-secondary">
                  <span>Email contact option will appear here when configured.</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

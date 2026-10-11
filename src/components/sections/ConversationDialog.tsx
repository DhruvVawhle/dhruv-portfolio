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
                  <div>
                    <span className="font-display font-bold text-base text-text-primary block">
                      {profile.label}
                    </span>
                    <span className="font-mono text-[11px] text-text-secondary truncate block max-w-[200px] sm:max-w-xs">
                      {profile.url}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(profile.label, profile.url)}
                      aria-label={`Copy ${profile.label} URL`}
                      className="px-3 py-1.5 rounded-xl border border-border-custom bg-bg-surface hover:bg-foreground/5 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      Copy
                    </button>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-accent text-white font-mono text-xs font-semibold hover:bg-accent/90 transition-colors"
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

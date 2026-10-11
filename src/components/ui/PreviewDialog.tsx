"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc?: string;
  pdfSrc?: string;
  subtitle?: string;
}

export default function PreviewDialog({
  isOpen,
  onClose,
  title,
  imageSrc,
  pdfSrc,
  subtitle,
}: PreviewDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setImgError(false);
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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
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

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-bg-surface border border-border-custom rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border-custom/80">
              <div>
                <h3 id="dialog-title" className="font-display font-bold text-lg sm:text-xl text-text-primary">
                  {title}
                </h3>
                {subtitle && (
                  <p className="font-mono text-xs text-text-secondary mt-0.5">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close dialog"
                className="w-9 h-9 rounded-full border border-border-custom bg-bg hover:bg-foreground/5 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Media Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-bg/50">
              {pdfSrc ? (
                <div className="w-full h-[65vh] rounded-2xl overflow-hidden border border-border-custom bg-black/10 flex flex-col">
                  <iframe
                    src={pdfSrc}
                    title={title}
                    className="w-full h-full border-none rounded-2xl"
                  />
                </div>
              ) : imageSrc && !imgError ? (
                <div className="relative w-full aspect-[4/3] max-h-[65vh] rounded-2xl overflow-hidden border border-border-custom bg-black/10 flex items-center justify-center">
                  <img
                    src={imageSrc}
                    alt={title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                /* Drawn Placeholder when real asset is pending */
                <div className="w-full aspect-[4/3] max-h-[55vh] rounded-2xl border-2 border-dashed border-border-custom flex flex-col items-center justify-center p-8 text-center bg-bg-surface">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M10 12H8v6" />
                      <path d="M14 12h-2v6h2" />
                      <path d="M16 12h2v3h-2" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-lg text-text-primary mb-1">
                    Official Document Placeholder
                  </h4>
                  <p className="font-mono text-xs text-text-secondary max-w-md">
                    Verified credential record for {title}. Real document scan preview will render here automatically upon file placement.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-custom/80 flex items-center justify-between font-mono text-xs text-text-secondary">
              <span>Verified Candidate Record</span>
              <div className="flex items-center gap-3">
                {pdfSrc && (
                  <a
                    href={pdfSrc}
                    download
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Download PDF ↓
                  </a>
                )}
                {(pdfSrc || imageSrc) && (
                  <a
                    href={pdfSrc || imageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-semibold"
                  >
                    Open full resolution ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

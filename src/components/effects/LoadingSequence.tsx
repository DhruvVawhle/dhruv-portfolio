"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export default function LoadingSequence() {
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if loading sequence already ran in this session to prevent annoyance on internal navigation
    const hasRan = sessionStorage.getItem("dv_portfolio_loaded");
    if (hasRan || shouldReduceMotion) {
      setIsLoading(false);
      return;
    }

    // 800-1200ms loading sequence as requested (approx 950ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("dv_portfolio_loaded", "true");
    }, 950);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-bg"
          style={{ backgroundColor: "var(--bg)" }}
        >
          <div className="flex flex-col items-center max-w-xs px-6">
            <motion.div
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-20 h-20 rounded-2xl bg-bg-surface border border-border-custom flex items-center justify-center shadow-lg mb-6"
            >
              <div
                className="absolute inset-1 rounded-xl pointer-events-none opacity-40 animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent, #3b82f6) 0%, transparent 70%)",
                }}
              />
              <span className="font-display font-extrabold text-2xl text-text-primary tracking-tight relative z-10">
                DV<span className="text-accent">.</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[11px] uppercase tracking-widest text-text-secondary mb-3 font-semibold"
            >
              Engineering Portfolio
            </motion.p>

            {/* Progress bar */}
            <div className="w-44 h-1 rounded-full bg-border-custom overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
                className="h-full bg-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

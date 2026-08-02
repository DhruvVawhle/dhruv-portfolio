"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function showToast(message: string = "Copied to clipboard") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("copy-toast", { detail: message }));
  }
}

export default function ClipboardToast() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setToast(customEvent.detail);
    };

    window.addEventListener("copy-toast", handleToast);
    return () => window.removeEventListener("copy-toast", handleToast);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100000] px-4 py-2.5 rounded-full bg-neutral-900 border border-white/10 text-white font-mono text-xs sm:text-sm shadow-xl flex items-center gap-2 select-none pointer-events-none"
        >
          <span className="text-emerald-500 font-bold">✓</span>
          <span>{toast}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

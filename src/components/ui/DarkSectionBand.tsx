import React from "react";

interface DarkSectionBandProps {
  label: string;
  headline: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function DarkSectionBand({
  label,
  headline,
  description,
  className = "",
  children,
}: DarkSectionBandProps) {
  return (
    <div
      className={`rounded-2xl md:rounded-3xl bg-[#14161a] dark:bg-[#111317] text-white p-8 sm:p-10 md:p-12 border border-white/10 dark:border-white/15 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Subtle ambient glow top right */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <span className="font-mono text-xs tracking-[0.14em] uppercase text-accent font-semibold block mb-3">
          {label}
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-[34px] text-white leading-tight tracking-tight max-w-2xl">
            {headline}
          </h2>

          {description && (
            <p className="text-sm sm:text-[15px] text-white/70 max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}

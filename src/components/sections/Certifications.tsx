"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { CREDENTIALS_DATA, CredentialItem } from "@/data/credentialsAndConnect";
import ScrollReveal from "@/components/effects/ScrollReveal";
import PreviewDialog from "@/components/ui/PreviewDialog";
import { useSimpleToast, copyToClipboard } from "@/components/ui/SimpleToast";
import { SiGooglecloud, SiCisco } from "react-icons/si";

type CategoryFilter = "All" | "Cloud" | "Data Science" | "AI & ML";

export default function Certifications() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All");
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    imageSrc?: string;
    subtitle?: string;
  }>({
    isOpen: false,
    title: "",
  });

  const { showToast } = useSimpleToast();

  const filterCounts = useMemo(() => {
    return {
      All: CREDENTIALS_DATA.length,
      Cloud: CREDENTIALS_DATA.filter((c) => c.categories.includes("Cloud")).length,
      "Data Science": CREDENTIALS_DATA.filter((c) => c.categories.includes("Data Science")).length,
      "AI & ML": CREDENTIALS_DATA.filter((c) => c.categories.includes("AI & ML")).length,
    };
  }, []);

  const filteredCredentials = useMemo(() => {
    if (selectedFilter === "All") return CREDENTIALS_DATA;
    return CREDENTIALS_DATA.filter((c) => c.categories.includes(selectedFilter));
  }, [selectedFilter]);

  const handleCopyId = async (idToCopy: string, certTitle: string) => {
    const success = await copyToClipboard(idToCopy);
    if (success) {
      showToast(`Credential ID ${idToCopy} copied`);
    } else {
      showToast("Failed to copy credential ID");
    }
  };

  const openPreview = (item: CredentialItem) => {
    setDialogState({
      isOpen: true,
      title: item.title,
      imageSrc: item.image,
      subtitle: `${item.issuer} ${item.credentialId ? `· ID: ${item.credentialId}` : ""}`,
    });
  };

  // Cursor Spotlight Tile Component
  const SpotlightCard = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const onMouseLeave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative rounded-3xl bg-bg-surface border border-border-custom p-6 sm:p-8 flex flex-col justify-between overflow-hidden group shadow-sm transition-all duration-300 ${className}`}
      >
        <motion.div
          style={{
            left: mouseX,
            top: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="pointer-events-none absolute w-72 h-72 rounded-full bg-accent/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div className="relative z-10 flex flex-col h-full justify-between">
          {children}
        </div>
      </div>
    );
  };

  const renderIssuerIcon = (icon: CredentialItem["issuerIcon"]) => {
    switch (icon) {
      case "cisco":
        return <SiCisco size={20} className="text-[#005073]" />;
      case "googlecloud":
        return <SiGooglecloud size={20} className="text-[#4285F4]" />;
      case "nxtwave":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-accent">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case "edunet":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-emerald-500">
            <path d="M12 2a8 8 0 0 0-8 8c0 3.25 1.95 6.06 4.78 7.32L8 22h8l-.78-4.68C18.05 16.06 20 13.25 20 10a8 8 0 0 0-8-8z" />
          </svg>
        );
    }
  };

  return (
    <section
      id="certifications"
      className="py-[var(--section-padding-y)] bg-bg section-alt relative"
      aria-label="Credentials Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Credentials / verified expertise
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Official certificates &amp; achievements
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Official certificates &amp; achievements
            </span>
          </div>

          <div className="max-w-3xl mb-10">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Industry-validated certifications &amp; technical credentials.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Demonstrated mastery across cloud infrastructure, networking, modern web development, and applied AI.
            </p>
          </div>

          {/* Filter Chips with Count Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {(["All", "Cloud", "Data Science", "AI & ML"] as CategoryFilter[]).map((cat) => {
              const isSelected = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  aria-pressed={isSelected}
                  className={`h-9 px-4 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-accent/15 border-accent text-accent shadow-xs"
                      : "bg-bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-neutral-300 dark:hover:border-neutral-600"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? "bg-accent text-white"
                        : "bg-foreground/10 text-text-secondary"
                    }`}
                  >
                    {filterCounts[cat]}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Section Label: Hides when no cards match */}
        {filteredCredentials.length > 0 && (
          <div className="mb-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Specialized technical certifications
            </span>
          </div>
        )}

        {/* 2-Column Grid (Desktop), 1 Column (Mobile), Equal Heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredCredentials.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                className="h-full flex flex-col"
              >
                <SpotlightCard className="h-full">
                  <div>
                    {/* Top Row: Issuer Icon, Name, Verified Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-bg border border-border-custom flex items-center justify-center flex-shrink-0">
                          {renderIssuerIcon(cert.issuerIcon)}
                        </div>
                        <span className="font-mono text-xs font-bold text-accent">
                          {cert.issuer}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-foreground/5 text-text-secondary font-mono text-[11px] font-semibold border border-border-custom">
                        Verified
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight mb-3 leading-snug">
                      {cert.title}
                    </h3>

                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cert.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-2.5 py-1 rounded-lg bg-bg border border-border-custom font-mono text-[11px] text-text-secondary"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Certificate Preview Area */}
                    <div className="mb-6">
                      {cert.hasImage && cert.image ? (
                        <div
                          onClick={() => openPreview(cert)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              openPreview(cert);
                            }
                          }}
                          aria-label={`View certificate ${cert.title}`}
                          className="relative w-full aspect-[16/9] max-h-52 rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden cursor-pointer group/cert hover:border-accent/60 transition-all shadow-xs"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover object-top group-hover/cert:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-surface text-text-primary font-mono text-xs font-bold shadow-lg">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <line x1="11" y1="8" x2="11" y2="14" />
                                <line x1="8" y1="11" x2="14" y2="11" />
                              </svg>
                              <span>View Certificate</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Dashed slot for Google Cloud without image / link */
                        <div className="w-full aspect-[16/9] max-h-52 rounded-2xl border-2 border-dashed border-border-custom bg-bg/50 flex flex-col items-center justify-center p-6 text-center">
                          <span className="font-mono text-xs text-text-primary font-bold">
                            Credential verified
                          </span>
                          <span className="font-mono text-[11px] text-text-secondary mt-1">
                            Certificate image coming soon
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pinned Card Footer */}
                  <div className="pt-4 border-t border-border-custom/80 flex flex-wrap items-center justify-between gap-3 mt-auto">
                    {cert.hasImage ? (
                      <>
                        <button
                          type="button"
                          onClick={() => openPreview(cert)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs font-semibold border border-accent/20 transition-colors cursor-pointer"
                        >
                          <span>View certificate ↗</span>
                        </button>

                        {cert.credentialId && (
                          <button
                            type="button"
                            onClick={() => handleCopyId(cert.credentialId!, cert.title)}
                            aria-label={`Copy credential ID ${cert.credentialId}`}
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-lg border border-border-custom bg-bg hover:bg-foreground/5 transition-colors cursor-pointer"
                          >
                            <span className="text-text-secondary/70">ID:</span>
                            <span className="font-semibold text-text-primary">{cert.credentialId}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-xs text-text-secondary">
                          Official credential
                        </span>
                        <span className="font-mono text-xs text-text-secondary">
                          Verified credential
                        </span>
                      </>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Certificate Preview Dialog */}
      <PreviewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        title={dialogState.title}
        imageSrc={dialogState.imageSrc}
        subtitle={dialogState.subtitle}
      />
    </section>
  );
}

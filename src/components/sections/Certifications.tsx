"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { CREDENTIALS_DATA, CredentialItem } from "@/data/credentialsAndConnect";
import ScrollReveal from "@/components/effects/ScrollReveal";
import PreviewDialog from "@/components/ui/PreviewDialog";
import { useSimpleToast, copyToClipboard } from "@/components/ui/SimpleToast";
import { 
  Award, 
  FileCheck, 
  Cpu, 
  Cloud, 
  Database, 
  Copy, 
  Check, 
  Eye
} from "lucide-react";

type CategoryFilter = "All" | "Cloud" | "Data Science" | "AI & ML";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function SpotlightCard({ children, className = "", onClick }: SpotlightCardProps) {
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
      onClick={onClick}
      className={`relative rounded-3xl bg-bg-surface border border-border-custom p-6 sm:p-7 flex flex-col justify-between overflow-hidden group shadow-xs hover:border-accent/50 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Subtle radial cursor glow */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none absolute w-80 h-80 rounded-full bg-accent/12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
      />
      <div className="relative z-10 flex flex-col h-full justify-between">
        {children}
      </div>
    </div>
  );
}

export default function Certifications() {
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
      "AI & ML": CREDENTIALS_DATA.filter((c) => c.categories.includes("AI & ML")).length,
      Cloud: CREDENTIALS_DATA.filter((c) => c.categories.includes("Cloud")).length,
      "Data Science": CREDENTIALS_DATA.filter((c) => c.categories.includes("Data Science")).length,
    };
  }, []);

  const filteredCredentials = useMemo(() => {
    if (selectedFilter === "All") return CREDENTIALS_DATA;
    return CREDENTIALS_DATA.filter((c) => c.categories.includes(selectedFilter));
  }, [selectedFilter]);

  const handleCopyId = async (idToCopy: string) => {
    const success = await copyToClipboard(idToCopy);
    if (success) {
      setCopiedId(idToCopy);
      showToast(`Credential ID ${idToCopy} copied to clipboard`);
      setTimeout(() => {
        setCopiedId((current) => (current === idToCopy ? null : current));
      }, 2200);
    } else {
      showToast("Failed to copy credential ID");
    }
  };

  const openPreview = (item: CredentialItem) => {
    setDialogState({
      isOpen: true,
      title: item.title,
      imageSrc: item.image,
      subtitle: `${item.issuer} ${item.credentialId ? `· ID: ${item.credentialId}` : "· Official Record"}`,
    });
  };

  const ISSUER_REAL_LOGOS: Record<
    CredentialItem["issuerIcon"],
    {
      name: string;
      logoSrc: string;
      alt: string;
      badgeBg: string;
    }
  > = {
    cisco: {
      name: "Cisco Networking Academy",
      logoSrc: "/images/certifications/logos/cisco.png",
      alt: "Cisco Networking Academy Official Logo",
      badgeBg: "bg-white p-1.5",
    },
    googlecloud: {
      name: "Google Cloud",
      logoSrc: "/images/certifications/logos/google-cloud.png",
      alt: "Google Cloud Official Logo",
      badgeBg: "bg-white p-1.5",
    },
    nxtwave: {
      name: "NxtWave",
      logoSrc: "/images/certifications/logos/nxtwave.png",
      alt: "NxtWave Official Logo",
      badgeBg: "bg-[#181b2a] border-[#2c3144] p-1.5",
    },
    edunet: {
      name: "Edunet Foundation",
      logoSrc: "/images/certifications/logos/edunet.png",
      alt: "Edunet Foundation Official Logo",
      badgeBg: "bg-white p-1.5",
    },
  };

  const getFilterIcon = (filter: CategoryFilter) => {
    switch (filter) {
      case "All":
        return <Award className="w-3.5 h-3.5" />;
      case "AI & ML":
        return <Cpu className="w-3.5 h-3.5" />;
      case "Cloud":
        return <Cloud className="w-3.5 h-3.5" />;
      case "Data Science":
        return <Database className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      id="certifications"
      className="py-[var(--section-padding-y)] bg-bg section-alt relative overflow-hidden scroll-mt-20 sm:scroll-mt-24"
      aria-label="Credentials & Certifications Section"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="content-width relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-custom/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Credentials
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-8">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Industry-validated certifications &amp; technical credentials.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Demonstrated mastery spanning Cloud infrastructure, Generative AI engineering, Applied Data Science, and enterprise networking protocols.
            </p>
          </div>


          {/* Filter Pills with Icons and Animated Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {(["All", "AI & ML", "Cloud", "Data Science"] as CategoryFilter[]).map((cat) => {
              const isSelected = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  aria-pressed={isSelected}
                  className={`relative h-10 px-4 sm:px-5 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-colors border cursor-pointer flex items-center gap-2 z-10 focus-visible:outline-2 focus-visible:outline-accent ${
                    isSelected
                      ? "text-background border-transparent"
                      : "bg-bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-neutral-300 dark:hover:border-neutral-600"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="cert-filter-pill-active"
                      className="absolute inset-0 bg-foreground rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  {getFilterIcon(cat)}
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? "bg-background/25 text-background"
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

        {/* Dynamic Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredCredentials.map((cert) => {
              const hasCopiedThis = copiedId === cert.credentialId;
              const issuerMeta = ISSUER_REAL_LOGOS[cert.issuerIcon];

              return (
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
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        {/* Top Meta Bar: Prominent Official Real Logo + Issuer Details */}
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-11 sm:h-12 px-2.5 rounded-2xl border border-border-custom flex items-center justify-center flex-shrink-0 shadow-xs overflow-hidden ${issuerMeta.badgeBg}`}>
                              <img
                                src={issuerMeta.logoSrc}
                                alt={issuerMeta.alt}
                                loading="lazy"
                                decoding="async"
                                className="h-7 w-auto max-w-[110px] object-contain"
                              />
                            </div>
                            <div>
                              <span className="font-sans text-xs font-semibold text-accent block leading-tight">
                                {cert.issuer}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-text-primary tracking-tight mb-3 leading-snug text-lg sm:text-xl">
                          {cert.title}
                        </h3>

                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {cert.categories.map((cat) => (
                            <span
                              key={cat}
                              className="px-2.5 py-1 rounded-lg bg-bg border border-border-custom font-sans text-xs text-text-secondary flex items-center gap-1.5"
                            >
                              {getFilterIcon(cat)}
                              <span>{cat}</span>
                            </span>
                          ))}
                        </div>

                        {/* Certificate Visual Preview Window */}
                        <div className="mb-5">
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
                              aria-label={`Open certificate preview: ${cert.title}`}
                              className="relative w-full rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden cursor-pointer group/cert hover:border-accent/60 transition-all shadow-xs aspect-[16/9] max-h-52"
                            >
                              <img
                                src={cert.image}
                                alt={`${cert.title} Certificate issued by ${cert.issuer}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-top group-hover/cert:scale-[1.02] transition-transform duration-300"
                              />

                              {/* Subtle Corner Badge */}
                              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-bg/85 backdrop-blur-md border border-border-custom text-text-primary font-mono text-[11px] flex items-center gap-1.5 opacity-80 group-hover/cert:opacity-100 transition-opacity">
                                <Eye className="w-3 h-3 text-accent" />
                                <span>Preview</span>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/9] max-h-52 rounded-2xl border-2 border-dashed border-border-custom bg-bg/50 flex flex-col items-center justify-center p-6 text-center">
                              <span className="font-sans text-xs text-text-secondary">
                                Certificate image coming soon
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Interactive Card Footer Bar */}
                      <div className="pt-4 border-t border-border-custom/80 flex items-center justify-between gap-2.5 mt-auto">
                        <span className="font-mono text-[11px] text-text-secondary">
                          {cert.issuer} Verified
                        </span>

                        {cert.credentialId && (
                          <button
                            type="button"
                            onClick={() => handleCopyId(cert.credentialId!)}
                            aria-label={`Copy credential ID ${cert.credentialId}`}
                            className={`inline-flex items-center gap-1.5 font-sans text-xs px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                              hasCopiedThis
                                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold"
                                : "bg-bg hover:bg-foreground/5 border-border-custom text-text-secondary hover:text-text-primary"
                            }`}
                          >
                            {hasCopiedThis ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <span className="text-text-secondary/70">ID:</span>
                                <span className="font-semibold text-text-primary">{cert.credentialId}</span>
                                <Copy className="w-3 h-3 text-text-secondary" />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
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

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CREDENTIALS_DATA, CredentialItem } from "@/data/credentialsAndConnect";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { useSimpleToast, copyToClipboard } from "@/components/ui/SimpleToast";
import GlassFolder, { FolderFile, ArtRecipe } from "@/components/ui/glass-folder-cards";
import { useTheme } from "@/hooks/useTheme";
import { usePointerTilt } from "@/components/sections/project-showcase/hooks";

const PreviewDialog = dynamic(() => import("@/components/ui/PreviewDialog"), {
  ssr: false,
});
import {
  Award,
  Cpu,
  Cloud,
  Database,
  Copy,
  Check,
  Eye,
  ExternalLink,
  Folder,
  LayoutGrid
} from "lucide-react";

type CategoryFilter = "All" | "Cloud" | "Data Science" | "AI & ML";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function SpotlightCard({ children, className = "", onClick }: SpotlightCardProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { cardRef, handlePointerMove, handlePointerLeave } =
    usePointerTilt(shouldReduceMotion);

  return (
    <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5 h-full">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
        style={{
          transform: shouldReduceMotion
            ? undefined
            : "perspective(1100px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transition: shouldReduceMotion
            ? undefined
            : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease",
        }}
        className={`relative rounded-3xl bg-bg-surface border border-border-custom p-6 sm:p-7 flex flex-col justify-between overflow-hidden group shadow-xs hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 h-full will-change-transform ${className}`}
      >
        {!shouldReduceMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.12), transparent 65%)",
            }}
          />
        )}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<"folders" | "grid">("folders");
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [folderWidth, setFolderWidth] = useState(340);

  useEffect(() => {
    const updateWidth = () => {
      setFolderWidth(window.innerWidth < 390 ? 276 : 340);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    imageSrc?: string;
    images?: string[];
    pdfSrc?: string;
    subtitle?: string;
    verifyUrl?: string;
  }>({
    isOpen: false,
    title: "",
  });

  const { showToast } = useSimpleToast();

  // Curated art recipes directly aligned with the site's engineering tokens
  const techArtRecipes: Record<"ai" | "cloud" | "data", ArtRecipe> = useMemo(() => {
    const isDark = theme === "dark";
    return {
      ai: {
        style: "streak",
        colors: isDark
          ? ["#090d16", "#0f172a", "#1e3a8a", "#2563eb", "#38bdf8", "#bae6fd"]
          : ["#f8fafc", "#e0f2fe", "#93c5fd", "#2563eb", "#1d4ed8"],
        scale: 0.7,
        warp: 1.15,
        angle: -0.42,
        gloss: 0.3,
        veins: 0,
      },
      cloud: {
        style: "streak",
        colors: isDark
          ? ["#070a12", "#0f172a", "#1e293b", "#3b82f6", "#6366f1", "#c7d2fe"]
          : ["#f8fafc", "#f1f5f9", "#cbd5e1", "#3b82f6", "#1e40af"],
        scale: 0.72,
        warp: 1.25,
        angle: 0.38,
        gloss: 0.28,
        veins: 0,
      },
      data: {
        style: "streak",
        colors: isDark
          ? ["#060c0a", "#06241a", "#064e3b", "#059669", "#10b981", "#a7f3d0"]
          : ["#f0fdf4", "#dcfce7", "#86efac", "#059669", "#064e3b"],
        scale: 0.7,
        warp: 1.05,
        angle: -0.55,
        gloss: 0.28,
        veins: 0,
      },
    };
  }, [theme]);

  const folderCategories = useMemo(() => {
    return [
      {
        id: "ai-ml",
        label: "AI & Machine Learning",
        art: techArtRecipes.ai,
        seed: 7,
        files: CREDENTIALS_DATA.filter((c) => c.categories.includes("AI & ML"))
          .map((c) => ({
            name: c.title.replace(/^.*?—\s*/, "").replace(/^.*-\s*/, ""),
            meta: c.credentialId ? `ID: ${c.credentialId}` : `${c.issuer} Verified`,
            image: c.image,
          }))
          .reverse(),
      },
      {
        id: "cloud",
        label: "Cloud & AI Security",
        art: techArtRecipes.cloud,
        seed: 3,
        files: CREDENTIALS_DATA.filter((c) => c.categories.includes("Cloud"))
          .map((c) => ({
            name: c.title.replace(/^.*?—\s*/, "").replace(/^.*-\s*/, ""),
            meta: c.credentialId ? `ID: ${c.credentialId}` : `${c.issuer} Verified`,
            image: c.image,
          }))
          .reverse(),
      },
      {
        id: "data-science",
        label: "Data Science & Networks",
        art: techArtRecipes.data,
        seed: 11,
        files: CREDENTIALS_DATA.filter((c) => c.categories.includes("Data Science"))
          .map((c) => ({
            name: c.title.replace(/^.*?—\s*/, "").replace(/^.*-\s*/, ""),
            meta: c.credentialId ? `ID: ${c.credentialId}` : `${c.issuer} Verified`,
            image: c.image,
          }))
          .reverse(),
      },
    ];
  }, [techArtRecipes]);

  const handleFolderFileSelect = (file: FolderFile) => {
    const matched = CREDENTIALS_DATA.find(
      (c) => c.image === file.image || c.title.includes(file.name)
    );
    if (matched) {
      openPreview(matched);
    }
  };

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
      images: item.images,
      pdfSrc: item.pdf,
      subtitle: `${item.issuer} ${item.credentialId ? `· ID: ${item.credentialId}` : "· Official Record"}`,
      verifyUrl: item.verifyUrl,
    });
  };

  const ISSUER_REAL_LOGOS: Record<
    CredentialItem["issuerIcon"],
    {
      name: string;
      logoSrc?: string;
      monogram?: string;
      alt: string;
      badgeBg: string;
    }
  > = {
    anthropic: {
      name: "Anthropic",
      logoSrc: "/images/certifications/logos/anthropic.svg",
      alt: "Anthropic Official Logo",
      badgeBg: "bg-white p-1.5 px-2.5",
    },
    ibm: {
      name: "IBM",
      logoSrc: "/images/certifications/logos/ibm.svg",
      alt: "IBM Official Logo",
      badgeBg: "bg-white p-1.5 px-2.5",
    },
    govindia: {
      name: "Government of India",
      logoSrc: "/images/certifications/logos/gov-india.svg",
      alt: "State Emblem of India – Government of India",
      badgeBg: "bg-white p-1.5",
    },
    infosys: {
      name: "Infosys Springboard",
      logoSrc: "/images/certifications/logos/infosys.svg",
      alt: "Infosys Springboard Official Logo",
      badgeBg: "bg-white p-1.5 px-2.5",
    },
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
      className="py-[var(--section-padding-y)] bg-bg section-alt relative overflow-x-clip scroll-mt-20 sm:scroll-mt-24"
      aria-label="Credentials & Certifications Section"
    >
      <div className="content-width relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border-custom/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-accent">
                Credentials
              </span>
            </div>

            {/* View Mode Switcher: Interactive Glass Folders vs Detailed Grid */}
            <div className="flex items-center p-1 rounded-2xl bg-bg-surface border border-border-custom shadow-xs w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setViewMode("folders")}
                aria-pressed={viewMode === "folders"}
                aria-label="Switch to Glass Folders view"
                className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl font-mono text-[11px] sm:text-xs font-medium transition-colors cursor-pointer touch-manipulation ${viewMode === "folders"
                  ? "text-background font-semibold"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                {viewMode === "folders" && (
                  <motion.div
                    layoutId="cert-view-mode-pill"
                    className="absolute inset-0 bg-foreground rounded-xl -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <Folder className="w-3.5 h-3.5" />
                <span>Glass Folders</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
                aria-label="Switch to Detailed Grid view"
                className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl font-mono text-[11px] sm:text-xs font-medium transition-colors cursor-pointer touch-manipulation ${viewMode === "grid"
                  ? "text-background font-semibold"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                {viewMode === "grid" && (
                  <motion.div
                    layoutId="cert-view-mode-pill"
                    className="absolute inset-0 bg-foreground rounded-xl -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Detailed Grid</span>
              </button>
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


          {/* Filter Pills with Icons and Animated Slider (Only in Grid View) */}
          {viewMode === "grid" && (
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {(["All", "AI & ML", "Cloud", "Data Science"] as CategoryFilter[]).map((cat) => {
                const isSelected = selectedFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    aria-pressed={isSelected}
                    className={`relative min-h-[48px] h-12 px-4 sm:px-5 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-colors border cursor-pointer flex items-center gap-2 z-10 focus-visible:outline-2 focus-visible:outline-accent active:scale-95 touch-manipulation ${isSelected
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
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${isSelected
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
          )}
        </ScrollReveal>

        {/* View Mode Switching: Glass Folders vs Dynamic Grid */}
        {viewMode === "folders" ? (
          <div className="py-2 w-full overflow-hidden sm:overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 sm:gap-y-14 gap-x-6 sm:gap-x-8 justify-items-center items-end">
              {folderCategories.map((folder, idx) => (
                <div key={folder.id} className="w-full max-w-[340px] flex flex-col items-center justify-center px-1">
                  <GlassFolder
                    label={folder.label}
                    art={folder.art}
                    seed={folder.seed}
                    width={folderWidth}
                    tone={theme === "dark" ? "dark" : "light"}
                    files={folder.files}
                    action="none"
                    appearDelay={idx * 140}
                    onFileSelect={handleFolderFileSelect}
                  />
                  <div className="mt-3 text-center">
                    <span className="font-mono text-xs text-text-secondary">
                      {folder.files.length} {folder.files.length === 1 ? "Credential" : "Credentials"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 sm:mt-12 text-center font-mono text-[11px] sm:text-xs text-text-secondary px-4">
              <span className="hidden sm:inline">Hover folder to tilt · Click folder to fan out · Click any certificate to inspect</span>
              <span className="sm:hidden">Tap folder to open · Tap any certificate to inspect</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredCredentials.map((cert, idx) => {
                const hasCopiedThis = copiedId === cert.credentialId;
                const issuerMeta = ISSUER_REAL_LOGOS[cert.issuerIcon];

                return (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.5,
                      delay: (idx % 2) * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full flex flex-col"
                  >
                    <SpotlightCard className="h-full">
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          {/* Top Meta Bar: Prominent Official Real Logo + Issuer Details */}
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`h-11 sm:h-12 px-2.5 rounded-2xl border border-border-custom flex items-center justify-center flex-shrink-0 shadow-xs overflow-hidden ${issuerMeta.badgeBg}`}>
                                {issuerMeta.logoSrc ? (
                                  <img
                                    src={issuerMeta.logoSrc}
                                    alt={issuerMeta.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-7 w-auto max-w-[110px] object-contain"
                                  />
                                ) : (
                                  <span className="font-mono text-xs font-bold tracking-wider">
                                    {issuerMeta.monogram}
                                  </span>
                                )}
                              </div>
                              <div>
                                <span className="font-sans text-xs font-semibold text-accent block leading-tight">
                                  {cert.issuer}
                                </span>
                                {cert.issuedDate && (
                                  <span className="font-mono text-[11px] text-text-secondary block mt-0.5">
                                    Issued {cert.issuedDate}
                                  </span>
                                )}
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
                                className="relative w-full rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden cursor-pointer group/cert hover:border-accent/60 transition-colors shadow-xs aspect-[16/9] max-h-52"
                              >
                                <img
                                  src={cert.image}
                                  alt={`${cert.title} Certificate issued by ${cert.issuer}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover object-top motion-safe:group-hover/cert:scale-[1.02] transition-transform duration-300"
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
                        <div className="pt-4 border-t border-border-custom/80 flex flex-wrap items-center justify-between gap-2.5 mt-auto">
                          <span className="font-mono text-[11px] text-text-secondary">
                            {cert.issuer} Verified
                          </span>

                          <div className="flex flex-wrap items-center gap-2">
                            {cert.verifyUrl && (
                              <a
                                href={cert.verifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-sans text-xs px-3 py-2 rounded-xl border border-accent/35 bg-accent/10 text-accent hover:bg-accent/15 transition-colors font-medium"
                              >
                                <span>Verify</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}

                            {cert.credentialId && (
                              <button
                                type="button"
                                onClick={() => handleCopyId(cert.credentialId!)}
                                aria-label={`Copy credential ID ${cert.credentialId}`}
                                className={`inline-flex items-center gap-1.5 font-sans text-xs px-3 py-2 rounded-xl border transition-colors cursor-pointer ${hasCopiedThis
                                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400 font-semibold"
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
                                    <span className="text-text-secondary">ID:</span>
                                    <span className="font-semibold text-text-primary max-w-[130px] truncate">{cert.credentialId}</span>
                                    <Copy className="w-3 h-3 text-text-secondary flex-shrink-0" />
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Certificate Preview Dialog */}
      <PreviewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        title={dialogState.title}
        imageSrc={dialogState.imageSrc}
        images={dialogState.images}
        pdfSrc={dialogState.pdfSrc}
        subtitle={dialogState.subtitle}
        verifyUrl={dialogState.verifyUrl}
      />
    </section>
  );
}

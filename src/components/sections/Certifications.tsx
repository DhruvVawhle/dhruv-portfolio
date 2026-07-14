"use client";

import React, { useState } from "react";
import Image from "next/image";
import { certifications } from "@/lib/data";
import ScrollReveal from "@/components/effects/ScrollReveal";
import LightboxModal from "@/components/ui/LightboxModal";
import { SiGooglecloud, SiCisco } from "react-icons/si";

const DefaultCertIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const NxtWaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const EdunetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a8 8 0 0 0-8 8c0 3.25 1.95 6.06 4.78 7.32L8 22h8l-.78-4.68C18.05 16.06 20 13.25 20 10a8 8 0 0 0-8-8z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const issuerBranding: Record<
  string,
  { bgClass: string; icon: React.ReactNode }
> = {
  "Google Cloud": {
    bgClass: "bg-foreground/5 text-text-primary border border-border-custom",
    icon: <SiGooglecloud size={18} />,
  },
  Cisco: {
    bgClass: "bg-foreground/5 text-text-primary border border-border-custom",
    icon: <SiCisco size={18} />,
  },
  "Cisco Networking Academy": {
    bgClass: "bg-foreground/5 text-text-primary border border-border-custom",
    icon: <SiCisco size={18} />,
  },
  NxtWave: {
    bgClass: "bg-foreground/5 text-text-primary border border-border-custom",
    icon: <NxtWaveIcon />,
  },
  "Edunet Foundation": {
    bgClass: "bg-foreground/5 text-text-primary border border-border-custom",
    icon: <EdunetIcon />,
  },
  "Infosys Springboard": {
    bgClass: "bg-foreground/5 text-text-primary border border-border-custom",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
};

export default function Certifications() {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const featuredCert = certifications[0]; // Google Cloud Certified Professional Machine Learning Engineer
  const secondaryCerts = certifications.slice(1); // Remaining credentials

  const renderCertCard = (cert: (typeof certifications)[0], i: number) => {
    const branding = issuerBranding[cert.issuer] || {
      bgClass: "bg-accent/10 text-accent border border-accent/20",
      icon: <DefaultCertIcon />,
    };

    const isPdf = cert.image?.endsWith(".pdf");

    return (
      <ScrollReveal key={cert.title} delay={i * 0.08} className="h-full">
        <div className="p-6 sm:p-7 rounded-2xl bg-bg-surface border border-border-custom hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${branding.bgClass}`}
              >
                {branding.icon}
              </div>
              <span className="px-3 py-1 rounded-full bg-foreground/5 text-text-secondary font-mono text-[11px] font-semibold border border-border-custom min-h-[26px] inline-flex items-center">
                VERIFIED
              </span>
            </div>

            <span className="text-sm font-mono text-accent font-semibold block mb-1.5">
              {cert.issuer}
            </span>
            <h3 className="font-display text-lg text-text-primary font-bold leading-snug mb-4 group-hover:text-accent transition-colors">
              {cert.title}
            </h3>

            {/* Uncropped Certificate Container / PDF Thumbnail */}
            {cert.image && (
              <div className="mb-7 sm:mb-8">
                {isPdf ? (
                  <div className="relative aspect-[4/3] w-full rounded-xl border border-border-custom bg-bg/60 p-4 flex flex-col items-center justify-center text-center group/pdf">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-2.5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M10 12H8v6" />
                        <path d="M14 12h-2v6h2" />
                        <path d="M16 12h2v3h-2" />
                      </svg>
                    </div>
                    <span className="font-mono text-sm text-text-primary font-bold">
                      Official PDF Certificate
                    </span>
                    <span className="font-mono text-xs text-text-secondary mt-0.5">
                      Click below to download or preview
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: cert.image!,
                        alt: `${cert.title} - ${cert.issuer}`,
                        caption: `${cert.title} (${cert.issuer})`,
                      })
                    }
                    className="relative aspect-[4/3] w-full rounded-xl border border-border-custom bg-bg/40 overflow-hidden cursor-pointer flex items-center justify-center p-2 group/img"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      className="object-contain p-2 group-hover/img:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-2 rounded-full bg-bg-surface text-text-primary font-mono text-xs font-semibold shadow-md">
                        Full-Size Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-border-custom/60 flex items-center justify-between gap-3">
            {cert.image ? (
              isPdf ? (
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-[42px] px-[18px] rounded-xl bg-accent/10 hover:bg-accent/15 text-accent font-mono text-[14px] font-semibold border border-accent/20 hover:border-accent/40 transition-all duration-200 whitespace-nowrap shadow-xs"
                >
                  <span>Download PDF →</span>
                </a>
              ) : (
                <button
                  onClick={() =>
                    setLightboxImage({
                      src: cert.image!,
                      alt: `${cert.title} - ${cert.issuer}`,
                      caption: `${cert.title} (${cert.issuer})`,
                    })
                  }
                  className="inline-flex items-center justify-center h-[42px] px-[18px] rounded-xl bg-accent/10 hover:bg-accent/15 text-accent font-mono text-[14px] font-semibold border border-accent/20 hover:border-accent/40 transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs"
                >
                  <span>View Certificate →</span>
                </button>
              )
            ) : (
              <span className="text-[14px] font-mono text-text-secondary">
                Official Credential
              </span>
            )}
            <span className="font-mono text-xs text-text-secondary/80 whitespace-nowrap">
              Credential ID
            </span>
          </div>
        </div>
      </ScrollReveal>
    );
  };

  return (
    <section
      id="certifications"
      className="py-[var(--section-padding-y)] bg-bg section-alt border-b border-border-custom/40 relative overflow-hidden"
    >
      <div className="content-width">
        {/* ── 1. EDITORIAL CHAPTER HEADER ──────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                07 · CREDENTIALS
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Verified Expertise
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Official Certificates &amp; Achievements
            </span>
          </div>

          <div className="max-w-2xl mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight">
              Industry-validated certifications &amp; technical credentials.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Demonstrated mastery across cloud infrastructure, networking, modern web development, and applied AI.
            </p>
          </div>
        </ScrollReveal>

        {/* ── MOBILE SWIPEABLE CAROUSEL (block md:hidden) ────────────────── */}
        <div className="block md:hidden mb-12">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="font-mono text-xs text-accent font-semibold tracking-wider uppercase">
              ← Swipe to explore ({certifications.length} credentials) →
            </span>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar">
            {[featuredCert, ...secondaryCerts].map((cert, idx) => (
              <div
                key={`mobile-cert-${cert.title}`}
                className="snap-center min-w-[285px] w-[85vw] max-w-[340px] flex-shrink-0 h-auto"
              >
                {renderCertCard(cert, idx)}
              </div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP FULL VIEW (hidden md:block) ────────────────────────── */}
        <div className="hidden md:block">
          {/* ── 2. HERO SHOWCASE: FEATURED INDUSTRY CREDENTIAL ── */}
          <ScrollReveal>
          <div className="mb-12">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-accent/10 via-bg-surface to-bg-surface border-2 border-accent/40 shadow-xl relative overflow-hidden group">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border-custom/60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
                    {featuredCert.issuer.includes("Cisco") ? (
                      <SiCisco size={24} />
                    ) : (
                      <SiGooglecloud size={24} />
                    )}
                  </div>
                  <div>
                    <span className="px-3.5 py-1 rounded-full bg-accent text-white font-mono text-[11px] font-bold tracking-wider uppercase shadow-xs min-h-[28px] inline-flex items-center">
                      FLAGSHIP PROFESSIONAL CREDENTIAL
                    </span>
                    <div className="font-mono text-xs text-text-secondary mt-1">
                      {featuredCert.issuer} · Verified Industry Certification
                    </div>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-accent/15 text-accent font-mono text-xs font-semibold border border-accent/30 min-h-[28px] inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {featuredCert.issuer.includes("Cisco")
                    ? "Featured Cisco Credential"
                    : "Featured Google Cloud Credential"}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary mb-3 leading-tight">
                    {featuredCert.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                    {featuredCert.issuer.includes("Cisco")
                      ? "Completed Cisco Networking Academy's Introduction to Data Science course covering data preparation, analytics, visualization, data-driven decision making, and introductory machine learning concepts."
                      : "Completed Google Cloud's verified learning path covering Generative AI security risks, threat modeling, cloud data protection, secure AI pipelines, and governance across cloud architectures."}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {(featuredCert.issuer.includes("Cisco")
                      ? [
                          "Data Preparation",
                          "Analytics",
                          "Data Visualization",
                          "Data-driven Decision Making",
                          "Machine Learning Concepts",
                        ]
                      : [
                          "AI Security",
                          "Threat Modeling",
                          "Cloud Data Protection",
                          "Secure AI Pipelines",
                          "AI Governance",
                        ]
                    ).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-bg border border-border-custom font-mono text-xs text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between pt-6 lg:pt-0 border-t lg:border-t-0 border-border-custom/60">
                  {featuredCert.image && (
                    <div
                      onClick={() =>
                        setLightboxImage({
                          src: featuredCert.image!,
                          alt: `${featuredCert.title} - ${featuredCert.issuer}`,
                          caption: `${featuredCert.title} (${featuredCert.issuer})`,
                        })
                      }
                      className="relative aspect-[4/3] w-full rounded-2xl border border-border-custom bg-bg/60 overflow-hidden cursor-pointer flex items-center justify-center p-4 group/hero mb-7 sm:mb-8"
                    >
                      <Image
                        src={featuredCert.image}
                        alt={featuredCert.title}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-contain p-3 group-hover/hero:scale-[1.02] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/hero:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 rounded-full bg-bg-surface text-text-primary font-mono text-xs font-bold shadow-lg">
                          Inspect Full Size
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-border-custom/60 flex items-center justify-between gap-3">
                    {featuredCert.image && (
                      <button
                        onClick={() =>
                          setLightboxImage({
                            src: featuredCert.image!,
                            alt: `${featuredCert.title} - ${featuredCert.issuer}`,
                            caption: `${featuredCert.title} (${featuredCert.issuer})`,
                          })
                        }
                        className="inline-flex items-center justify-center h-[42px] px-[18px] rounded-xl bg-accent/10 hover:bg-accent/15 text-accent font-mono text-[14px] font-semibold border border-accent/20 hover:border-accent/40 transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs"
                      >
                        <span>
                          {featuredCert.issuer.includes("Cisco")
                            ? "View Certificate →"
                            : "View Completion Badge →"}
                        </span>
                      </button>
                    )}
                    <span className="font-mono text-xs text-text-secondary/80 whitespace-nowrap">
                      Credential ID
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 3. SUPPORTING CREDENTIALS GRID ───────────────────────── */}
        <ScrollReveal>
          <div className="mb-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              SPECIALIZED TECHNICAL CERTIFICATIONS
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryCerts.map((cert, i) => renderCertCard(cert, i))}
        </div>
        </div>
      </div>

      <LightboxModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        src={lightboxImage?.src || ""}
        alt={lightboxImage?.alt || ""}
        caption={lightboxImage?.caption}
      />
    </section>
  );
}

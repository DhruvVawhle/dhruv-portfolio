"use client";

import React from "react";
import {
  SiRazorpay,
  SiFramer,
  SiGooglegemini,
  SiNextdotjs,
  SiExpress,
  SiN8N,
  SiTelegram,
  SiWhatsapp,
  SiMongodb,
  SiPandas,
} from "react-icons/si";
import { cn } from "@/lib/utils";

const RestApiSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const RagSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const VectorDbSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const FirestoreSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4.86 18.53L3.89 12.35L11.53 4.71L12.98 5.48L4.86 18.53Z" fill="#FFA000" />
    <path d="M14.91 3.23L13.46 2.45C13.25 2.34 13.01 2.33 12.79 2.44L10.36 4.87L15.69 13.43L18.89 8.3L14.91 3.23Z" fill="#F57C00" />
    <path d="M18.89 8.3L15.69 13.43L19.46 19.48L20.57 12.38L18.89 8.3Z" fill="#FFCA28" />
    <path d="M4.86 18.53L12.98 5.48L15.69 13.43L19.46 19.48L12.18 21.67C11.96 21.74 11.72 21.72 11.51 21.61L4.86 18.53Z" fill="#FFA000" />
  </svg>
);

const SqlSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="5.5" rx="8.5" ry="3.5" fill="#38BDF8" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.8" />
    <path d="M3.5 5.5V12C3.5 13.93 7.31 15.5 12 15.5C16.69 15.5 20.5 13.93 20.5 12V5.5" stroke="#0078D4" strokeWidth="1.8" />
    <path d="M3.5 12V18.5C3.5 20.43 7.31 22 12 22C16.69 22 20.5 20.43 20.5 18.5V12" stroke="#0284C7" strokeWidth="1.8" />
    <path d="M7 11.5C7 11.5 9 12.8 12 12.8C15 12.8 17 11.5 17 11.5" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const FallbackTechSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

type IconConfig =
  | { type: "devicon"; className: string; isDarkLogo?: boolean }
  | {
      type: "react-icon";
      icon: React.ComponentType<{ className?: string }>;
      colorClass?: string;
      isDarkLogo?: boolean;
    };

const ICON_MAP: Record<string, IconConfig> = {
  // Languages & Data Science
  Python: { type: "devicon", className: "devicon-python-plain colored" },
  Matplotlib: { type: "devicon", className: "devicon-matplotlib-plain colored" },
  "REST APIs": {
    type: "react-icon",
    icon: RestApiSvg,
    colorClass: "text-[#10B981]",
  },
  RAG: {
    type: "react-icon",
    icon: RagSvg,
    colorClass: "text-[#818CF8]",
  },
  "Vector Database": {
    type: "react-icon",
    icon: VectorDbSvg,
    colorClass: "text-[#3B82F6]",
  },
  JavaScript: { type: "devicon", className: "devicon-javascript-plain colored" },
  TypeScript: { type: "devicon", className: "devicon-typescript-plain colored" },
  HTML: { type: "devicon", className: "devicon-html5-plain colored" },
  CSS: { type: "devicon", className: "devicon-css3-plain colored" },
  SQL: {
    type: "react-icon",
    icon: SqlSvg,
  },
  Pandas: {
    type: "react-icon",
    icon: SiPandas,
    colorClass: "text-[#150458]",
    isDarkLogo: true,
  },

  // Frameworks & Libraries
  React: { type: "devicon", className: "devicon-react-original colored" },
  "Next.js": {
    type: "react-icon",
    icon: SiNextdotjs,
    colorClass: "text-[#000000]",
    isDarkLogo: true,
  },
  "Node.js": { type: "devicon", className: "devicon-nodejs-plain colored" },
  Express: {
    type: "react-icon",
    icon: SiExpress,
    colorClass: "text-[#000000]",
    isDarkLogo: true,
  },
  Flask: { type: "devicon", className: "devicon-flask-original colored", isDarkLogo: true },
  Vite: { type: "devicon", className: "devicon-vitejs-plain colored" },
  "Tailwind CSS": { type: "devicon", className: "devicon-tailwindcss-plain colored" },
  "Framer Motion": {
    type: "react-icon",
    icon: SiFramer,
    colorClass: "text-[#0055FF]",
  },

  // Databases & Cloud
  MongoDB: {
    type: "react-icon",
    icon: SiMongodb,
    colorClass: "text-[#47A248]",
  },
  Firestore: {
    type: "react-icon",
    icon: FirestoreSvg,
  },
  Firebase: { type: "devicon", className: "devicon-firebase-plain colored" },
  AWS: { type: "devicon", className: "devicon-amazonwebservices-plain-wordmark colored", isDarkLogo: true },
  GCP: { type: "devicon", className: "devicon-googlecloud-plain colored" },
  "Google Cloud": { type: "devicon", className: "devicon-googlecloud-plain colored" },
  Vercel: { type: "devicon", className: "devicon-vercel-original colored", isDarkLogo: true },
  Docker: { type: "devicon", className: "devicon-docker-plain colored" },

  // Tools, Workflow & APIs
  Git: { type: "devicon", className: "devicon-git-plain colored" },
  GitHub: { type: "devicon", className: "devicon-github-original colored", isDarkLogo: true },
  Arduino: { type: "devicon", className: "devicon-arduino-plain colored" },
  Razorpay: {
    type: "react-icon",
    icon: SiRazorpay,
    colorClass: "text-[#0B72E7]",
  },
  OAuth: { type: "devicon", className: "devicon-oauth-plain colored" },
  "Google Gemini API": {
    type: "react-icon",
    icon: SiGooglegemini,
    colorClass: "text-[#8E75B2]",
  },
  "Gemini API": {
    type: "react-icon",
    icon: SiGooglegemini,
    colorClass: "text-[#8E75B2]",
  },
  "Google Cloud STT": { type: "devicon", className: "devicon-googlecloud-plain colored" },
  "Google Cloud TTS": { type: "devicon", className: "devicon-googlecloud-plain colored" },
  n8n: {
    type: "react-icon",
    icon: SiN8N,
    colorClass: "text-[#FF6D5A]",
  },
  Excel: { type: "devicon", className: "devicon-microsoftexcel-plain colored" },
  "Telegram Bot API": {
    type: "react-icon",
    icon: SiTelegram,
    colorClass: "text-[#26A5E4]",
  },
  "WhatsApp Business API": {
    type: "react-icon",
    icon: SiWhatsapp,
    colorClass: "text-[#25D366]",
  },
  "C++": { type: "devicon", className: "devicon-cplusplus-plain colored" },
};

interface TechIconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  withContainer?: boolean;
}

export default function TechIcon({
  name,
  size = "md",
  className,
  withContainer = false,
}: TechIconProps) {
  const config = ICON_MAP[name];

  const containerSize =
    size === "lg"
      ? "w-8 h-8 text-[30px]"
      : size === "sm"
      ? "w-4.5 h-4.5 text-[16px]"
      : "w-6 h-6 text-[22px]";

  const svgSize =
    size === "lg"
      ? "w-7 h-7"
      : size === "sm"
      ? "w-4 h-4"
      : "w-5.5 h-5.5";

  // If no config found, return fallback clean code bracket icon so no space is empty
  if (!config) {
    const fallbackElement = (
      <span
        className={cn(
          "inline-flex items-center justify-center flex-shrink-0 leading-none text-[#3B82F6]",
          containerSize,
          className
        )}
        title={name}
      >
        <FallbackTechSvg className={svgSize} />
      </span>
    );

    if (withContainer) {
      return (
        <span
          className="inline-flex items-center justify-center rounded-[14px] p-3 border shadow-[0_0_18px_rgba(59,130,246,0.12)] transition-all duration-300 flex-shrink-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          {fallbackElement}
        </span>
      );
    }
    return fallbackElement;
  }

  const isDark = config.isDarkLogo || false;

  let iconContent: React.ReactNode = null;

  if (config.type === "devicon") {
    iconContent = (
      <span
        className={cn(
          "inline-flex items-center justify-center flex-shrink-0 leading-none",
          containerSize,
          className
        )}
      >
        <i className={cn(config.className, "leading-none")} />
      </span>
    );
  } else {
    const IconComponent = config.icon;
    iconContent = (
      <span
        className={cn(
          "inline-flex items-center justify-center flex-shrink-0 leading-none",
          containerSize,
          className
        )}
      >
        <IconComponent className={cn(svgSize, config.colorClass)} />
      </span>
    );
  }

  // If this icon is dark (e.g. Express, Pandas, Next.js, GitHub, Vercel, Flask, AWS),
  // place it inside an 8% white glass circular container with thin white border and soft inner shadow.
  if (isDark) {
    const darkWrapperSize =
      size === "lg"
        ? "w-10 h-10 p-1.5"
        : size === "sm"
        ? "w-6 h-6 p-1"
        : "w-8 h-8 p-1.5";

    iconContent = (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-white/[0.08] border border-white/20 shadow-[inset_0_1px_4px_rgba(255,255,255,0.15)] flex-shrink-0 backdrop-blur-sm",
          darkWrapperSize
        )}
        style={{
          filter: config.type === "devicon" ? "brightness(0) invert(1)" : undefined,
        }}
        title={name}
      >
        {config.type === "react-icon" ? (
          <config.icon className={cn(svgSize, "text-white drop-shadow-sm")} />
        ) : (
          iconContent
        )}
      </span>
    );
  }

  if (withContainer) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-[14px] p-3 border shadow-[0_0_18px_rgba(59,130,246,0.12)] transition-all duration-300 flex-shrink-0",
          withContainer ? className : ""
        )}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        {iconContent}
      </span>
    );
  }

  return iconContent;
}


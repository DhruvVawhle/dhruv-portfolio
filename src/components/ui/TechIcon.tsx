"use client";

import React from "react";
import { cn } from "@/lib/utils";

const RazorpaySvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" />
  </svg>
);

const FramerSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
);

const GeminiSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
  </svg>
);

const NextdotjsSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
  </svg>
);

const ExpressSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
  </svg>
);

const N8nSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
  </svg>
);

const TelegramSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WhatsappSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const MongodbSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
  </svg>
);

const PandasSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.455zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67Z" />
  </svg>
);

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
    icon: PandasSvg,
    colorClass: "text-[#150458]",
    isDarkLogo: true,
  },

  // Frameworks & Libraries
  React: { type: "devicon", className: "devicon-react-original colored" },
  "React.js": { type: "devicon", className: "devicon-react-original colored" },
  "Next.js": {
    type: "react-icon",
    icon: NextdotjsSvg,
    colorClass: "text-[#000000]",
    isDarkLogo: true,
  },
  "Node.js": { type: "devicon", className: "devicon-nodejs-plain colored" },
  Express: {
    type: "react-icon",
    icon: ExpressSvg,
    colorClass: "text-[#000000]",
    isDarkLogo: true,
  },
  "Express.js": {
    type: "react-icon",
    icon: ExpressSvg,
    colorClass: "text-[#000000]",
    isDarkLogo: true,
  },
  Flask: { type: "devicon", className: "devicon-flask-original colored", isDarkLogo: true },
  Vite: { type: "devicon", className: "devicon-vitejs-plain colored" },
  "Tailwind CSS": { type: "devicon", className: "devicon-tailwindcss-plain colored" },
  "Framer Motion": {
    type: "react-icon",
    icon: FramerSvg,
    colorClass: "text-[#0055FF]",
  },

  // Databases & Cloud
  MongoDB: {
    type: "react-icon",
    icon: MongodbSvg,
    colorClass: "text-[#47A248]",
  },
  Firestore: {
    type: "react-icon",
    icon: FirestoreSvg,
  },
  "Firebase Firestore": {
    type: "react-icon",
    icon: FirestoreSvg,
  },
  Firebase: { type: "devicon", className: "devicon-firebase-plain colored" },
  MySQL: { type: "devicon", className: "devicon-mysql-plain colored" },
  SQLite: { type: "devicon", className: "devicon-sqlite-plain colored" },
  AWS: { type: "devicon", className: "devicon-amazonwebservices-plain-wordmark colored", isDarkLogo: true },
  GCP: { type: "devicon", className: "devicon-googlecloud-plain colored" },
  "Google Cloud": { type: "devicon", className: "devicon-googlecloud-plain colored" },
  "Google Cloud Platform (GCP)": { type: "devicon", className: "devicon-googlecloud-plain colored" },
  Vercel: { type: "devicon", className: "devicon-vercel-original colored", isDarkLogo: true },
  Docker: { type: "devicon", className: "devicon-docker-plain colored" },

  // Tools, Workflow & Testing
  Git: { type: "devicon", className: "devicon-git-plain colored" },
  GitHub: { type: "devicon", className: "devicon-github-original colored", isDarkLogo: true },
  Postman: { type: "devicon", className: "devicon-postman-plain colored" },
  "Functional Testing": {
    type: "react-icon",
    icon: FallbackTechSvg,
    colorClass: "text-[#10B981]",
  },
  "Test Case Design": {
    type: "react-icon",
    icon: FallbackTechSvg,
    colorClass: "text-[#3B82F6]",
  },
  Arduino: { type: "devicon", className: "devicon-arduino-plain colored" },
  Razorpay: {
    type: "react-icon",
    icon: RazorpaySvg,
    colorClass: "text-[#0B72E7]",
  },
  OAuth: { type: "devicon", className: "devicon-oauth-plain colored" },
  "Google Gemini API": {
    type: "react-icon",
    icon: GeminiSvg,
    colorClass: "text-[#8E75B2]",
  },
  "Gemini API": {
    type: "react-icon",
    icon: GeminiSvg,
    colorClass: "text-[#8E75B2]",
  },
  "Machine Learning": {
    type: "react-icon",
    icon: RagSvg,
    colorClass: "text-[#06B6D4]",
  },
  "scikit-learn": { type: "devicon", className: "devicon-scikitlearn-plain colored" },
  "TensorFlow/Keras": { type: "devicon", className: "devicon-tensorflow-line colored" },
  "ARIMA Forecasting": {
    type: "react-icon",
    icon: FallbackTechSvg,
    colorClass: "text-[#10B981]",
  },
  "Prompt Injection Defense": {
    type: "react-icon",
    icon: FallbackTechSvg,
    colorClass: "text-[#EF4444]",
  },
  "Google Cloud STT": { type: "devicon", className: "devicon-googlecloud-plain colored" },
  "Google Cloud TTS": { type: "devicon", className: "devicon-googlecloud-plain colored" },
  n8n: {
    type: "react-icon",
    icon: N8nSvg,
    colorClass: "text-[#FF6D5A]",
  },
  Excel: { type: "devicon", className: "devicon-microsoftexcel-plain colored" },
  "Telegram Bot API": {
    type: "react-icon",
    icon: TelegramSvg,
    colorClass: "text-[#26A5E4]",
  },
  "WhatsApp Business API": {
    type: "react-icon",
    icon: WhatsappSvg,
    colorClass: "text-[#25D366]",
  },
  "WhatsApp API": {
    type: "react-icon",
    icon: WhatsappSvg,
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


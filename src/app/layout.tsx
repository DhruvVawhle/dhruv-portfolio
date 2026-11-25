import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const metaTitle = "Dhruv Vawhle | Software Engineer Portfolio";
const metaDescription =
  "Explore the portfolio of Dhruv Vawhle, a Software Engineer and B.Tech IT undergraduate specializing in full-stack web applications, n8n workflows, and applied ML.";

export const metadata: Metadata = {
  title: {
    default: metaTitle,
    template: "%s | Dhruv Vawhle",
  },
  description: metaDescription,
  metadataBase: new URL("https://dhruvvawhle.vercel.app"),
  alternates: {
    canonical: "https://dhruvvawhle.vercel.app/",
  },
  keywords: [
    "Dhruv Vawhle",
    "Software Engineer",
    "Full-Stack Web Development",
    "AI Systems",
    "Mumbai Software Engineer",
    "Full-Stack Web Development",
    "Applied Machine Learning",
    "AI Security",
    "n8n Workflows",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PromptShield",
    "CampusAI",
    "KrishiSaathi",
    "MediMitra",
  ],
  authors: [{ name: "Dhruv Vawhle", url: "https://dhruvvawhle.vercel.app" }],
  creator: "Dhruv Vawhle",
  openGraph: {
    type: "website",
    url: "https://dhruvvawhle.vercel.app",
    title: metaTitle,
    description: metaDescription,
    siteName: "Dhruv Vawhle Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/images/projects/promptshield.png",
        width: 1200,
        height: 630,
        alt: "PromptShield LLM prompt injection detection gateway and portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    creator: "@DhruvVawhle",
    images: ["/images/projects/promptshield.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "dMPCXL48lHMJIItWvhLlf0FfO_zpYFWvNGcN59KtKQY",
      "ilWe8rbEpZ3jRWG1eMpVD5-MIA3McyKXWSekxu8heQY",
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://dhruvvawhle.vercel.app/#profilepage",
      url: "https://dhruvvawhle.vercel.app",
      name: metaTitle,
      description: metaDescription,
      mainEntity: {
        "@id": "https://dhruvvawhle.vercel.app/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://dhruvvawhle.vercel.app/#person",
      name: "Dhruv Vawhle",
      alternateName: ["Dhruv", "dhruvvawhle"],
      jobTitle: "Software Engineer",
      url: "https://dhruvvawhle.vercel.app",
      image: "https://dhruvvawhle.vercel.app/images/profile/dhruv-vawhle.jpg",
      email: "mailto:dhruvvawhle@gmail.com",
      gender: "https://schema.org/Male",
      nationality: {
        "@type": "Country",
        name: "India",
      },
      homeLocation: {
        "@type": "Place",
        name: "Mumbai, Maharashtra, India",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Bachelor of Technology in Information Technology",
        description: "Graduation Class of 2027",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationalCategory: "15-1252.00",
        skills:
          "Full-Stack Web Development, TypeScript, React, Next.js, Node.js, Python, FastAPI, Docker, n8n automation, Machine Learning, AI Security",
      },
      sameAs: [
        "https://github.com/DhruvVawhle",
        "https://linkedin.com/in/dhruv-vawhle-277b2b2b8",
      ],
      description: metaDescription,
      knowsAbout: [
        "Software Engineering",
        "Full-Stack Web Development",
        "AI Security & LLM Guardrails",
        "Machine Learning",
        "n8n Automation Workflows",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "FastAPI",
        "Docker",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://dhruvvawhle.vercel.app/#website",
      url: "https://dhruvvawhle.vercel.app",
      name: metaTitle,
      description: metaDescription,
      publisher: {
        "@id": "https://dhruvvawhle.vercel.app/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": "https://dhruvvawhle.vercel.app/#projects-list",
      name: "Featured Engineering Projects by Dhruv Vawhle",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: "MediMitra AI",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            description:
              "AI healthcare triage system and automated n8n workflow engine connecting patients to real-time doctor routing with 40% latency reduction.",
            url: "https://medimitra-ai.vercel.app",
            author: { "@id": "https://dhruvvawhle.vercel.app/#person" },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            name: "PromptShield",
            applicationCategory: "SecurityApplication",
            operatingSystem: "Web, Cloud",
            description:
              "Enterprise AI security gateway and threat prevention proxy with sub-15ms pipeline latency, morphological suffix-stripping heuristic engine, and OWASP LLM Top 10 coverage.",
            codeRepository: "https://github.com/DhruvVawhle/PromptShield",
            author: { "@id": "https://dhruvvawhle.vercel.app/#person" },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "SoftwareApplication",
            name: "KrishiSaathi",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Smart agri-tech marketplace platform connecting farmers directly to commercial buyers with ML yield prediction and zero intermediary fees.",
            codeRepository: "https://github.com/DhruvVawhle/KrishiSaathi",
            author: { "@id": "https://dhruvvawhle.vercel.app/#person" },
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "SoftwareApplication",
            name: "CampusAI",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            description:
              "Autonomous multilingual AI reception robot and indoor navigation kiosk for Shree L. R. Tiwari College of Engineering (SLRTCE), featuring a reactive 3D avatar, vector SVG floor maps with mobile QR handoffs, and Groq Whisper voice loop.",
            codeRepository: "https://github.com/DhruvVawhle/CampusAI",
            author: { "@id": "https://dhruvvawhle.vercel.app/#person" },
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://dhruvvawhle.vercel.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Dhruv Vawhle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dhruv Vawhle is a Software Engineer and B.Tech Information Technology student (graduating in 2027) based in Mumbai, India. He specializes in full-stack web architectures, applied machine learning systems, automated n8n workflows, and AI security gateways.",
          },
        },
        {
          "@type": "Question",
          name: "What technologies and frameworks does Dhruv Vawhle specialize in?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dhruv's core technical stack includes TypeScript, Next.js, React, Node.js, Python, FastAPI, Docker, Tailwind CSS, PostgreSQL, MongoDB, Firebase, and n8n workflow automation.",
          },
        },
        {
          "@type": "Question",
          name: "What key software projects has Dhruv Vawhle developed?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dhruv has developed MediMitra (an AI healthcare triage platform with automated n8n routing), PromptShield (an adversarial prompt injection security gateway for LLMs), KrishiSaathi (an agri-tech marketplace with ML yield forecasting), and CampusAI (an autonomous campus assistant).",
          },
        },
        {
          "@type": "Question",
          name: "How can engineering recruiters and teams hire or contact Dhruv Vawhle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can reach Dhruv directly via email at dhruvvawhle@gmail.com, on LinkedIn at linkedin.com/in/dhruv-vawhle-277b2b2b8, or explore his open-source code repositories on GitHub at github.com/DhruvVawhle.",
          },
        },
      ],
    },
  ],
};
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "devicon/devicon.min.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

import SmoothScrollProvider from "@/components/effects/SmoothScrollProvider";
import { SimpleToastProvider } from "@/components/ui/SimpleToast";
import ClientEffects from "@/components/effects/ClientEffects";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="dv-pre-init"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration" in history){history.scrollRestoration="manual";}var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s||(d?"dark":"light");document.documentElement.setAttribute("data-theme",t);if(t==="dark"){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}var b=/Lighthouse|PageSpeed|HeadlessChrome/i.test(navigator.userAgent);if(!b){var nav=window.performance&&window.performance.getEntriesByType&&window.performance.getEntriesByType("navigation")[0];var isReload=(nav&&nav.type==="reload")||(window.performance&&window.performance.navigation&&window.performance.navigation.type===1)||(sessionStorage.getItem("dv_is_reload")==="true");var isFirst=sessionStorage.getItem("dv_portfolio_visited")!=="true";if(isFirst||isReload){if(window.location.hash){history.replaceState(null,"",window.location.pathname+window.location.search);}window.scrollTo(0,0);document.documentElement.classList.add("dv-loading-active");}}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text-primary font-body antialiased">
        {/* Instant Frame-0 Preload Curtain: Eliminates portfolio content flash before loader hydrates */}
        <div
          id="dv-static-curtain"
          suppressHydrationWarning
          className="fixed inset-0 z-[999990] flex-col items-center justify-center bg-bg select-none cursor-pointer"
          aria-hidden="true"
        >
          <div className="relative flex items-center justify-center h-[260px] scale-75 sm:scale-85 select-none pointer-events-none">
            <div className="loader">
              <div className="box box0"><div></div></div>
              <div className="box box1"><div></div></div>
              <div className="box box2"><div></div></div>
              <div className="box box3"><div></div></div>
              <div className="box box4"><div></div></div>
              <div className="box box5"><div></div></div>
              <div className="box box6"><div></div></div>
              <div className="box box7"><div></div></div>
              <div className="ground"><div></div></div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center mt-3 px-6 text-center pointer-events-none">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-display font-extrabold text-2xl tracking-tight text-text-primary">
                Dhruv Vawhle<span className="text-accent">.</span>
              </span>
            </div>
            <p className="font-mono text-xs text-text-secondary mb-4">
              Full-stack, AI systems &amp; automation
            </p>
            <div className="w-52 h-1 rounded-full bg-border-custom overflow-hidden relative mb-2.5">
              <div
                id="dv-preload-bar"
                className="h-full bg-accent rounded-full dv-progress-bar-anim"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-text-secondary">
              <span id="dv-preload-txt">Loading portfolio...</span>
            </div>
          </div>
          <span className="absolute bottom-6 font-mono text-xs text-text-secondary/70">
            Click anywhere to enter
          </span>
        </div>
        <SmoothScrollProvider>
          <SimpleToastProvider>
            <ClientEffects />
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            {children}
            <Analytics />
          </SimpleToastProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

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

const metaTitle = "Dhruv Vawhle | Software Engineer & AI Security Specialist in Mumbai";
const metaDescription =
  "Explore the portfolio of Dhruv Vawhle, a Software Engineer and AI Security Specialist specializing in full-stack web applications, n8n workflows, and applied ML.";

export const metadata: Metadata = {
  title: {
    default: metaTitle,
    template: "%s | Dhruv Vawhle",
  },
  description: metaDescription,
  metadataBase: new URL("https://dhruvvawhle.vercel.app"),
  alternates: {
    canonical: "https://dhruvvawhle.vercel.app",
  },
  keywords: [
    "Dhruv Vawhle",
    "Software Engineer",
    "AI Security Specialist",
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
      "@type": "Person",
      "@id": "https://dhruvvawhle.vercel.app/#person",
      name: "Dhruv Vawhle",
      jobTitle: "Software Engineer & AI Security Specialist",
      url: "https://dhruvvawhle.vercel.app",
      image: "https://dhruvvawhle.vercel.app/images/profile/dhruv-vawhle.jpg",
      sameAs: [
        "https://github.com/DhruvVawhle",
        "https://linkedin.com/in/dhruv-vawhle-277b2b2b8",
      ],
      description: metaDescription,
      knowsAbout: [
        "Software Engineering",
        "Full-Stack Web Development",
        "AI Security",
        "Machine Learning",
        "n8n Workflows",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "PromptShield",
        "FastAPI",
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
  ],
};
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ThemeInitializer from "@/components/ui/ThemeInitializer";
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

import ClientEffects from "@/components/effects/ClientEffects";
import SmoothScrollProvider from "@/components/effects/SmoothScrollProvider";
import { SimpleToastProvider } from "@/components/ui/SimpleToast";

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
        <ThemeInitializer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text-primary font-body antialiased">
        <SmoothScrollProvider>
          <SimpleToastProvider>
            <ClientEffects />
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            {children}
          </SimpleToastProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

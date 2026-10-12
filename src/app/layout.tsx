import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

import profileData from "@/data/profile.json";

export const metadata: Metadata = {
  title: "Dhruv Vawhle — Software Engineer",
  description: profileData.summary,
  metadataBase: new URL("https://dhruvvawhle.vercel.app"),
  alternates: {
    canonical: "https://dhruvvawhle.vercel.app",
  },
  keywords: [
    "Dhruv Vawhle",
    "Software Engineer",
    "Full-Stack Web Development",
    "Applied Machine Learning",
    "AI Security",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PromptShield",
    "CampusAI",
    "KrishiSaathi",
  ],
  authors: [{ name: "Dhruv Vawhle", url: "https://dhruvvawhle.vercel.app" }],
  openGraph: {
    type: "website",
    url: "https://dhruvvawhle.vercel.app",
    title: "Dhruv Vawhle — Software Engineer",
    description: profileData.summary,
    siteName: "Dhruv Vawhle Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Vawhle — Software Engineer",
    description: profileData.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: [
      "dMPCXL48lHMJIItWvhLlf0FfO_zpYFWvNGcN59KtKQY",
      "ilWe8rbEpZ3jRWG1eMpVD5-MIA3McyKXWSekxu8heQY",
    ],
  },
};

import CubertoCursor from "@/components/effects/CubertoCursor";
import LoadingSequence from "@/components/effects/LoadingSequence";
import ClipboardToast from "@/components/ui/ClipboardToast";
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
      data-theme="dark"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-text-primary font-body antialiased">
        <SmoothScrollProvider>
          <SimpleToastProvider>
            <ThemeInitializer />
            <LoadingSequence />
            <CubertoCursor />
            <ClipboardToast />
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

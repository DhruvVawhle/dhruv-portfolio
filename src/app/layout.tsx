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
  title: `${profileData.name} — ${profileData.currentRole}`,
  description: `Portfolio of ${profileData.name} — a ${profileData.currentRole.toLowerCase()} building production software. Tagline: "${profileData.tagline}"`,
  keywords: [
    profileData.name,
    "Full Stack Developer",
    "AI ML Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Portfolio",
    "KrishiSaathi",
    "MedTalk",
  ],
  authors: [{ name: profileData.name }],
  openGraph: {
    type: "website",
    title: `${profileData.name} — ${profileData.currentRole}`,
    description: profileData.tagline,
    siteName: `${profileData.name} Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} — ${profileData.currentRole}`,
    description: profileData.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CubertoCursor from "@/components/effects/CubertoCursor";
import LoadingSequence from "@/components/effects/LoadingSequence";
import ClipboardToast from "@/components/ui/ClipboardToast";

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
        <ThemeInitializer />
        <LoadingSequence />
        <CubertoCursor />
        <ClipboardToast />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import ThemeInitializer from "@/components/ui/ThemeInitializer";
import "./globals.css";
import "devicon/devicon.min.css";

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

export const metadata: Metadata = {
  title: "Dhruv Vawhle — Full-Stack Developer & AI/ML Engineer",
  description:
    "Portfolio of Dhruv Vawhle — a full-stack developer and AI/ML engineer building production software with real data, real users, and real legal ownership. Featured projects include KrishiSaathi (copyright-filed farm marketplace) and MedTalk (AI healthcare chatbot).",
  keywords: [
    "Dhruv Vawhle",
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
  authors: [{ name: "Dhruv Vawhle" }],
  openGraph: {
    type: "website",
    title: "Dhruv Vawhle — Full-Stack Developer & AI/ML Engineer",
    description:
      "Building production software with real data, real users, and real legal ownership.",
    siteName: "Dhruv Vawhle Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Vawhle — Full-Stack Developer & AI/ML Engineer",
    description:
      "Building production software with real data, real users, and real legal ownership.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-text-primary font-body antialiased">
        <ThemeInitializer />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

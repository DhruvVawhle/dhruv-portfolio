import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "framer-motion",
    ],
  },
  images: {
    // Trim deviceSizes to avoid upscaling the 1366×768 hero source.
    // Default includes 2048 & 3840 which cause blurry upscaled variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [100, 75],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      {
        source: "/Dhruv_Resume.pdf",
        destination: "/resume.pdf",
        permanent: true,
      },
      {
        source: "/documents/Dhruv_Resume_Updated_24-10-2026.pdf",
        destination: "/resume.pdf",
        permanent: true,
      },
      {
        source: "/documents/Dhruv_Vawhle_Resume_19-11-2026.pdf",
        destination: "/resume.pdf",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/(resume.pdf|medimitra-case-study.pdf|documents/:path*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

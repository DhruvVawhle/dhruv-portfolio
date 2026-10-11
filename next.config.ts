import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Trim deviceSizes to avoid upscaling the 1366×768 hero source.
    // Default includes 2048 & 3840 which cause blurry upscaled variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    qualities: [100, 75],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

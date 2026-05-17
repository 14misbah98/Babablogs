import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['tesseract.js'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

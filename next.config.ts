import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home folder confuses root detection; pin it to this repo.
  turbopack: { root: __dirname },
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;

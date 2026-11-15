import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Stamped into the unhashed /sc and /media URLs so a new build is never served from an old cache.
  env: { NEXT_PUBLIC_ASSET_V: String(Date.now()) },
  images: {
    unoptimized: true,
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;

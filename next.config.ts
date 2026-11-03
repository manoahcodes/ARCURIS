import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,

  // Hosts allowed to load dev scripts (your tunnel).
  allowedDevOrigins: ["jqm5236t-3000.inc1.devtunnels.ms"],

  experimental: {
    serverActions: {
      // Hosts allowed to call Server Actions (host only, no scheme).
      allowedOrigins: ["jqm5236t-3000.inc1.devtunnels.ms"],
    },
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
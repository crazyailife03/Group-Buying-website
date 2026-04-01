import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/團購平台" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

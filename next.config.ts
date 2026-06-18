import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow specific hostnames (older Next versions) as a fallback
    domains: ["images.unsplash.com", "res.cloudinary.com", "images.pexels.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;

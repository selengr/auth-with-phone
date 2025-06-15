import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['randomuser.me','https://randomuser.me'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL || "https://pokeapi.co/api/v2/",
  },
};

export default nextConfig;

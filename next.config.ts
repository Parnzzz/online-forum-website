import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:["plus.unsplash.com","images.unsplash.com","picsum.photos", "fastly.picsum.photos", "media.istockphoto.com" ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

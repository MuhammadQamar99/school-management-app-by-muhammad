/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Production build ko TypeScript warnings par rukne na dein
    ignoreBuildErrors: true,
  },
  eslint: {
    // Production build ko ESLint warnings par rukne na dein
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
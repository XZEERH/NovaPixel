import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Mengabaikan linting saat build agar tidak terjadi error "Unknown options"
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Tetap aktifkan pengecekan tipe agar kode tetap aman
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api-faa.my.id" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
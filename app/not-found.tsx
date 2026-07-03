"use client";
import Link from 'next/link';
import GlassCard from '@/components/UI/GlassCard';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0c]">
      <GlassCard className="text-center max-w-md">
        <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">404</h1>
        <h2 className="text-xl font-bold mb-4 text-white">Pixel Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you are looking for has been upscaled out of existence or never existed in this dimension.
        </p>
        <Link href="/" className="inline-block bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-purple-500 hover:text-white transition-all shadow-xl shadow-white/5">
          Back to Reality
        </Link>
      </GlassCard>
    </div>
  );
}
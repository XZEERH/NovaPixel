"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0a0c]/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-purple-600 rounded-lg group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
            <Sparkles size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">
            Nova<span className="text-purple-500">Pixel</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/image-hd" className="hover:text-white transition-colors">Image HD</Link>
          <Link href="/video-hd" className="hover:text-white transition-colors">Video HD</Link>
          <span className="cursor-not-allowed opacity-50">AI Face Enhance</span>
        </div>

        <Link href="/image-hd" className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition-all">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
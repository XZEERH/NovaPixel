"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap, Shield, MousePointer2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background Neon Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

      <section className="container mx-auto px-6 py-24 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-8"
        >
          <Zap size={16} /> New: Video Upscaling 4K is here
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
          ENHANCE EVERY <br />
          <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent italic">PIXEL.</span>
        </h1>
        
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 font-medium">
          The next generation of AI media enhancement. Upscale images and videos to professional standards with one click.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/image-hd" className="group bg-purple-600 hover:bg-purple-700 px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2">
            Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-10 py-5 rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/5 transition-all">
            View Showcase
          </button>
        </div>
      </section>
      
      {/* Feature Cards Section dipanggil di sini menggunakan struktur yang sama seperti file sebelumnya */}
    </div>
  );
}
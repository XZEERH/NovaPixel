"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Image as LucideImage, 
  Video, 
  UserRound, 
  History 
} from 'lucide-react';

// Import Komponen Pendukung
import SamplePreview from "@/components/Hero/SamplePreview";
import FeatureCard from "@/components/FeatureCard";
import ComingSoonCard from "@/components/ComingSoonCard";

const features = [
  {
    title: "Image HD",
    desc: "Upscale images to 4K resolution with AI details.",
    icon: LucideImage,
    href: "/image-hd",
    delay: 0.1
  },
  {
    title: "Video HD",
    desc: "Smooth and sharpen videos up to 60FPS HD.",
    icon: Video,
    href: "/video-hd",
    delay: 0.2
  }
];

const comingSoon = [
  { title: "AI Face Enhance", icon: UserRound },
  { title: "AI Restore", icon: History }
];

export default function Home() {
  return (
    <div className="relative pt-20 overflow-hidden bg-[#0a0a0c]">
      {/* Background Neon Blur Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full -z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-0" />

      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-6 py-24 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-8"
        >
          <Zap size={16} /> New: Video Upscaling 4K is here
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white"
        >
          ENHANCE EVERY <br />
          <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent italic">PIXEL.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          The next generation of AI media enhancement. Upscale images and videos to professional standards with one click.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/image-hd" className="group bg-purple-600 hover:bg-purple-700 px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 text-white shadow-xl shadow-purple-900/20">
            Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-10 py-5 rounded-2xl font-bold text-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white backdrop-blur-sm">
            View Showcase
          </button>
        </motion.div>
      </section>

      {/* --- PREVIEW SECTION (Before & After) --- */}
      <SamplePreview />

      {/* --- FEATURES GRID SECTION --- */}
      <section className="container mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful AI Tools</h2>
          <p className="text-gray-500">Everything you need for pixel-perfect content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Features */}
          {features.map((f) => (
            <FeatureCard 
              key={f.title}
              title={f.title}
              desc={f.desc}
              icon={f.icon}
              href={f.href}
              delay={f.delay}
            />
          ))}

          {/* Coming Soon Features */}
          {comingSoon.map((f) => (
            <ComingSoonCard 
              key={f.title}
              title={f.title}
              icon={f.icon}
            />
          ))}
        </div>
      </section>

      {/* Footer Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-purple-900/10 to-transparent -z-0" />
    </div>
  );
}
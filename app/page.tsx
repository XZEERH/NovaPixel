"use client";
import { motion } from "framer-motion";
import { Image, Video, UserRound, History, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/UI/GlassCard";

const features = [
  { title: "Image HD", desc: "Upscale images to 4K resolution with AI details.", icon: Image, link: "/image-hd", status: "active" },
  { title: "Video HD", desc: "Smooth and sharpen videos up to 60FPS HD.", icon: Video, link: "/video-hd", status: "active" },
  { title: "AI Face Enhance", desc: "Restore facial details in blurry photos.", icon: UserRound, link: "#", status: "soon" },
  { title: "AI Restore", desc: "Fix old, scratched, or damaged photographs.", icon: History, link: "#", status: "soon" },
];

export default function Home() {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 text-center mb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter">
            Enhance Every <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Pixel.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            Professional-grade AI tools to upscale, sharpen, and restore your media with just one click.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/image-hd" className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-purple-900/20">
              Start Enhancing
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            {f.status === "active" ? (
              <Link href={f.link}>
                <GlassCard className="h-full hover:border-purple-500/50 transition-all group">
                  <f.icon className="mb-4 text-purple-500" size={32} />
                  <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{f.desc}</p>
                  <div className="flex items-center text-purple-400 text-sm font-bold group-hover:gap-2 transition-all">
                    Try Now <ArrowRight size={16} />
                  </div>
                </GlassCard>
              </Link>
            ) : (
              <GlassCard className="h-full opacity-60 grayscale relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white">Coming Soon</div>
                <f.icon className="mb-4 text-gray-400" size={32} />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">Access Not Available Yet</p>
              </GlassCard>
            )}
          </motion.div>
        ))}
      </section>
    </div>
  );
}
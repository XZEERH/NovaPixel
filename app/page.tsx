"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Image as LucideImage,
  Video,
  UserRound,
  History,
  Layers3,
  Sparkles,
  BookOpenText,
} from "lucide-react";

import SamplePreview from "@/components/Hero/SamplePreview";
import FeatureCard from "@/components/FeatureCard";
import ComingSoonCard from "@/components/ComingSoonCard";
import { ROUTES } from "@/constants/routes";

const features = [
  {
    title: "Image HD",
    desc: "Upscale gambar ke kualitas tinggi dengan detail yang tetap natural.",
    icon: LucideImage,
    href: ROUTES.IMAGE_HD,
    delay: 0.1,
  },
  {
    title: "Video HD",
    desc: "Tingkatkan video dengan proses yang aman dan alur yang lebih rapi.",
    icon: Video,
    href: ROUTES.VIDEO_HD,
    delay: 0.2,
  },
  {
    title: "All Enhancers",
    desc: "Masuk ke halaman yang menampilkan semua tool yang tersedia sekarang.",
    icon: Layers3,
    href: ROUTES.ENHANCER,
    delay: 0.3,
  },
  {
    title: "About / Guide",
    desc: "Baca konteks pemakaian dan alur kerja image maupun video enhancer.",
    icon: BookOpenText,
    href: ROUTES.ABOUT,
    delay: 0.4,
  },
];

const comingSoon = [
  { title: "AI Face Enhance", icon: UserRound },
  { title: "AI Restore", icon: History },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden pt-20">
      <div className="absolute left-[-10%] top-[-8%] h-[40%] w-[40%] rounded-full bg-white/5 blur-[120px] -z-0" />
      <div className="absolute bottom-[-12%] right-[-8%] h-[40%] w-[40%] rounded-full bg-white/5 blur-[120px] -z-0" />

      <section className="container mx-auto relative z-10 px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border-2 border-black/90 bg-white px-4 py-2 text-sm font-black text-black shadow-[8px_8px_0_#000]"
        >
          <Zap size={16} /> NovaPixel Ready To Execute!
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mx-auto max-w-5xl text-5xl font-black leading-[0.9] tracking-tighter text-white md:text-8xl"
        >
          IMPROVE EVERY QUALITY IN{" "}
          <span className="bg-gradient-to-r from-white via-zinc-200 to-slate-400 bg-clip-text text-transparent">
            NOVAPIXEL.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-white/65 md:text-xl"
        >
          Platform AI untuk memperjelas gambar dan video, meningkatkan resolusi, serta menghasilkan kualitas visual terbaik hanya dalam beberapa klik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href={ROUTES.ENHANCER}
            className="group inline-flex items-center justify-center gap-2 rounded-[1.4rem] border-[3px] border-black/90 bg-white px-8 py-4 text-lg font-black text-black shadow-[10px_10px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-white/90"
          >
            Get Started
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={ROUTES.ABOUT}
            className="group inline-flex items-center justify-center gap-2 rounded-[1.4rem] border-[3px] border-black/90 bg-[#111118] px-8 py-4 text-lg font-black text-white shadow-[10px_10px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-white/10"
          >
            View Chase
            <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
          </Link>
        </motion.div>
      </section>

      <SamplePreview />

      <section className="container mx-auto relative z-10 px-6 py-24">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            className="text-3xl font-black text-white md:text-4xl"
          >
            Powerful AI Tools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: false, amount: 0.25 }}
            className="mx-auto mt-4 max-w-2xl text-white/55"
          >
            Semua fitur utama yang tersedia sekarang dikumpulkan di satu alur yang lebih jelas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
          {comingSoon.map((f) => (
            <ComingSoonCard key={f.title} title={f.title} icon={f.icon} />
          ))}
        </div>
      </section>

      <div className="absolute bottom-0 left-1/2 -z-0 h-[300px] w-full -translate-x-1/2 bg-gradient-to-t from-white/5 to-transparent" />
    </div>
  );
}

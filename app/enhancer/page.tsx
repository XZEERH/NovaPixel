"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers3, Image as ImageIcon, Video, BookOpenText, Sparkles, CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import GlassCard from "@/components/UI/GlassCard";

const tools = [
  {
    title: "Image HD",
    desc: "Untuk gambar yang ingin di-upscale tanpa menghilangkan alur editing lama.",
    href: ROUTES.IMAGE_HD,
    icon: ImageIcon,
    badge: "Available",
  },
  {
    title: "Video HD",
    desc: "Untuk video yang butuh peningkatan kualitas dengan tampilan yang tetap stabil.",
    href: ROUTES.VIDEO_HD,
    icon: Video,
    badge: "Available",
  },
  {
    title: "About / Guide",
    desc: "Berisi konteks cara pakai, kapan memilih image/video, dan alur pemakaiannya.",
    href: ROUTES.ABOUT,
    icon: BookOpenText,
    badge: "Guide",
  },
];

const notes = [
  "Semua tool utama terkumpul di sini.",
  "Tidak ada perubahan yang menghapus sistem lama.",
  "Navigasi dibuat lebih cepat untuk mobile dan desktop.",
];

export default function EnhancerPage() {
  return (
    <div className="container mx-auto px-6 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-black/90 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-black shadow-[8px_8px_0_#000]">
            <Layers3 size={14} /> All Enhancers
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Semua tool yang tersedia
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-white/60">
            Halaman ini jadi pintu masuk utama untuk seluruh fitur enhancement yang bisa dipakai sekarang.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link href={tool.href} className="group block h-full">
                <GlassCard className="h-full transition-all group-hover:-translate-y-1 group-hover:bg-white/[0.08]">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] border-2 border-black/90 bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-black shadow-[8px_8px_0_#000]">
                      <tool.icon size={26} />
                    </div>
                    <span className="rounded-full border-2 border-black/90 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-black shadow-[5px_5px_0_#000]">
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{tool.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{tool.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-fuchsia-300">
                    Open tool <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {notes.map((note) => (
            <GlassCard key={note} className="p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 text-cyan-300" size={18} />
                <p className="text-sm leading-relaxed text-white/70">{note}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-8 bg-gradient-to-br from-fuchsia-500/14 to-cyan-400/10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-fuchsia-200">
                <Sparkles size={14} /> Fast path
              </p>
              <h2 className="text-2xl font-black text-white md:text-3xl">
                Mau langsung ke Image atau Video?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                Dua tool utama tetap tersedia terpisah supaya sistem lama tetap aman, tapi semuanya bisa dijangkau dari satu tempat.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={ROUTES.IMAGE_HD}
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border-[3px] border-black/90 bg-white px-6 py-4 text-sm font-black text-black shadow-[8px_8px_0_#000] transition-all hover:-translate-y-0.5"
              >
                Go to Image HD
                <ArrowRight size={16} />
              </Link>
              <Link
                href={ROUTES.VIDEO_HD}
                className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border-[3px] border-black/90 bg-white/[0.08] px-6 py-4 text-sm font-black text-white shadow-[8px_8px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                Go to Video HD
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

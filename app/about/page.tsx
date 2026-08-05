"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Image as ImageIcon, Video, ArrowRight, Sparkles, PlayCircle, Wand2, BookOpenText } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import GlassCard from "@/components/UI/GlassCard";

const steps = [
  {
    title: "Pilih jenis media",
    desc: "Gunakan Image HD untuk gambar atau Video HD untuk video. Pilih sesuai kebutuhan output.",
  },
  {
    title: "Upload file",
    desc: "Masukkan file yang ingin ditingkatkan. Sistem lama tetap dipertahankan, jadi alurnya tidak berubah drastis.",
  },
  {
    title: "Proses dan download",
    desc: "Tunggu proses selesai lalu unduh hasilnya. Tombol download tetap disediakan di halaman tool masing-masing.",
  },
];

const whenToUse = [
  "Image HD: cocok untuk foto, poster, thumbnail, dan aset visual statis.",
  "Video HD: cocok untuk footage, clip pendek, dan hasil render bergerak.",
  "Halaman Enhancer: pintu masuk cepat untuk semua fitur yang tersedia.",
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border-2 border-black/90 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-black shadow-[8px_8px_0_#000]">
            <BookOpenText size={14} className="text-black" />
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            About / Guide
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-white/60">
            Halaman ini menjelaskan fungsi enhancer image dan video, plus cara pakainya supaya alurnya lebih jelas.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <GlassCard className="bg-gradient-to-br from-white/6 to-transparent">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.1rem] border-2 border-black/90 bg-white text-black shadow-[8px_8px_0_#000]">
              <ImageIcon size={26} />
            </div>
            <h2 className="text-2xl font-black text-white">Image Enhancement</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Dipakai untuk gambar statis yang butuh detail lebih tajam, noise lebih rapi, dan hasil yang lebih premium.
            </p>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-white/5 to-transparent">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.1rem] border-2 border-black/90 bg-white text-black shadow-[8px_8px_0_#000]">
              <Video size={26} />
            </div>
            <h2 className="text-2xl font-black text-white">Video Enhancement</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Dipakai untuk video bergerak agar hasilnya tetap enak dilihat dan alurnya tidak membingungkan pengguna.
            </p>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-white/4 to-transparent">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.1rem] border-2 border-black/90 bg-gradient-to-br from-white/10 to-white/4 text-black shadow-[8px_8px_0_#000]">
              <Wand2 size={26} />
            </div>
            <h2 className="text-2xl font-black text-white">Use Context</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Gunakan halaman Enhancer sebagai pintu masuk utama, lalu lanjut ke tool yang sesuai supaya navigasi terasa cepat.
            </p>
          </GlassCard>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <GlassCard key={step.title}>
              <div className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-white/70">
                Step 0{index + 1}
              </div>
              <h3 className="text-2xl font-black text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-white/70">
                <Sparkles size={14} /> When to use
              </p>
              <h2 className="text-3xl font-black text-white">Panduan singkat pemakaian</h2>
              <div className="mt-6 space-y-4">
                {whenToUse.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 text-cyan-300" size={18} />
                    <p className="text-sm leading-relaxed text-white/65">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <Link
                href={ROUTES.ENHANCER}
                className="group flex items-center justify-between rounded-[1.2rem] border-2 border-black/90 bg-white px-5 py-4 text-sm font-black text-black shadow-[8px_8px_0_#000] transition-all hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3">
                  <PlayCircle size={18} />
                  Open Enhancer
                </span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={ROUTES.IMAGE_HD}
                className="group flex items-center justify-between rounded-[1.2rem] border-2 border-black/90 bg-white/[0.08] px-5 py-4 text-sm font-black text-white shadow-[8px_8px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <span className="flex items-center gap-3">
                  <ImageIcon size={18} />
                  Go to Image HD
                </span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={ROUTES.VIDEO_HD}
                className="group flex items-center justify-between rounded-[1.2rem] border-2 border-black/90 bg-white/[0.08] px-5 py-4 text-sm font-black text-white shadow-[8px_8px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                <span className="flex items-center gap-3">
                  <Video size={18} />
                  Go to Video HD
                </span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}


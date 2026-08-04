"use client";
import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import GlassCard from '../UI/GlassCard';
import { motion } from 'framer-motion';

export default function SamplePreview() {
  return (
    <section className="container mx-auto relative z-10 px-6 py-20">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          className="text-3xl font-black text-white md:text-4xl"
        >
          Unmatched AI Quality
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: false, amount: 0.25 }}
          className="mx-auto mt-4 max-w-xl text-white/55"
        >
          Lihat before/after yang jadi inti pengalaman NovaPixel tanpa menghapus alur lama yang sudah ada.
        </motion.p>
      </div>

      <GlassCard className="mx-auto max-w-5xl p-2 shadow-[12px_12px_0_#000,0_0_40px_rgba(34,211,238,0.14)]">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=10&w=1200"
              alt="Low Resolution Original"
              style={{ filter: 'blur(2px) grayscale(0.2)' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
              alt="NovaPixel AI Enhanced"
            />
          }
          className="h-[350px] w-full rounded-[1.5rem] md:h-[520px]"
        />
      </GlassCard>
    </section>
  );
}

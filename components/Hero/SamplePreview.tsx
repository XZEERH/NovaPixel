"use client";
import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import GlassCard from '../UI/GlassCard'; // IMPORT TANPA KURUNG KURAWAL
import { motion } from 'framer-motion';

export default function SamplePreview() {
  return (
    <section className="container mx-auto px-6 py-20 relative z-10">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
        >
          Unmatched AI Quality
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-xl mx-auto"
        >
          See how NovaPixel reconstructs lost details and removes noise in real-time.
        </motion.p>
      </div>
      
      <GlassCard className="max-w-4xl mx-auto p-2 overflow-hidden shadow-2xl shadow-purple-500/10">
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
          className="rounded-2xl h-[350px] md:h-[500px] w-full"
        />
      </GlassCard>
    </section>
  );
}
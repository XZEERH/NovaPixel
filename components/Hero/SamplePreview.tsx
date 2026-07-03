"use client";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { GlassCard } from '../UI/GlassCard';
import { motion } from 'framer-motion';

export default function SamplePreview() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Unmatched Quality</h2>
        <p className="text-gray-400">See how NovaPixel reconstructs lost details in real-time.</p>
      </div>
      
      <GlassCard className="max-w-4xl mx-auto p-2 overflow-hidden shadow-2xl shadow-purple-500/10">
        <ReactCompareSlider
          itemOne={<ReactCompareSliderImage src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=10&w=1200" alt="Low Res" style={{ filter: 'blur(4px) grayscale(0.5)' }} />}
          itemTwo={<ReactCompareSliderImage src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200" alt="AI Enhanced" />}
          className="rounded-2xl h-[400px] md:h-[500px]"
        />
      </GlassCard>
    </section>
  );
}
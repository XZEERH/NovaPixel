"use client";

import { useState } from 'react';
import { useEnhancer } from '@/hooks/useEnhancer';
import { enhanceImage } from '@/services/ai-service';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { GlassCard } from '@/components/UI/GlassCard';
import { ProcessingProgressBar } from '@/components/Progress/ProcessingSteps';
import { Download, Upload, RefreshCw } from 'lucide-react';

export default function ImageHDPage() {
  const { status, step, result, original, processFile } = useEnhancer(enhanceImage);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        AI Image Upscaler HD
      </h1>

      {status === 'idle' && (
        <GlassCard className="flex flex-col items-center justify-center py-20 border-dashed border-2">
          <Upload className="w-16 h-16 text-purple-500 mb-4 animate-bounce" />
          <p className="text-xl mb-6">Drop your image here or click to upload</p>
          <input type="file" id="upload" hidden onChange={handleUpload} accept="image/*" />
          <label htmlFor="upload" className="cursor-pointer bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full transition-all">
            Select Image
          </label>
        </GlassCard>
      )}

      {status === 'processing' && (
        <GlassCard className="text-center py-12">
          <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-semibold mb-4 text-white">Enhancing Your Image</h2>
          <p className="text-gray-400 mb-8 italic">Please wait, our AI is working on every pixel...</p>
          <ProcessingProgressBar progress={step} />
        </GlassCard>
      )}

      {status === 'done' && result && original && (
        <div className="space-y-6">
          <GlassCard className="p-2 overflow-hidden">
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={original} alt="Original" />}
              itemTwo={<ReactCompareSliderImage src={result} alt="Enhanced" />}
              className="rounded-2xl max-h-[70vh]"
            />
          </GlassCard>
          
          <div className="flex justify-center gap-4">
            <button onClick={() => window.location.reload()} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all">
              Try Another
            </button>
            <a href={result} download="NovaPixel-HD.png" className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-xl flex items-center gap-2 font-bold hover:scale-105 transition-all">
              <Download size={20} /> Download HD
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
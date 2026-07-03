"use client";
import { useEnhancer } from '@/hooks/useEnhancer';
import { GlassCard } from '@/components/UI/GlassCard';
import { CustomProgress } from '@/components/Progress/CustomProgress';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Upload, Download, RefreshCw, Wand2 } from 'lucide-react';

export default function ImageHDPage() {
  const { status, originalUrl, resultUrl, startProcessing } = useEnhancer('image');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) startProcessing(e.target.files[0]);
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Image <span className="text-purple-500">Enhancer</span></h1>
          <p className="text-gray-400">Transform low-res images into 4K masterpieces instantly.</p>
        </div>

        {status === 'idle' && (
          <GlassCard className="flex flex-col items-center py-20 border-dashed border-2 border-purple-500/20">
            <div className="p-6 bg-purple-500/10 rounded-full mb-6">
              <Upload size={48} className="text-purple-500" />
            </div>
            <input type="file" id="img-up" hidden accept="image/*" onChange={onFileChange} />
            <label htmlFor="img-up" className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-2xl font-bold cursor-pointer transition-all">
              Choose Image
            </label>
          </GlassCard>
        )}

        {(status !== 'idle' && status !== 'completed' && status !== 'error') && (
          <GlassCard className="py-20 text-center">
            <Wand2 className="mx-auto text-purple-500 animate-pulse mb-6" size={48} />
            <CustomProgress status={status} />
          </GlassCard>
        )}

        {status === 'completed' && resultUrl && originalUrl && (
          <div className="space-y-8">
            <GlassCard className="p-2 overflow-hidden bg-black">
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src={originalUrl} alt="Original" />}
                itemTwo={<ReactCompareSliderImage src={resultUrl} alt="Enhanced" />}
                className="h-[500px] w-full rounded-2xl"
              />
            </GlassCard>
            <div className="flex justify-center gap-4">
              <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl transition-all">
                <RefreshCw size={20} /> Try New
              </button>
              <a href={resultUrl} target="_blank" download className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <Download size={20} /> Download HD
              </a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <GlassCard className="text-center py-20">
            <p className="text-red-400 mb-6 font-medium">Failed to process image. Please try again.</p>
            <button onClick={() => window.location.reload()} className="bg-white/10 px-8 py-3 rounded-xl">Retry</button>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
"use client";
import React from 'react';
import { useEnhancer } from '@/hooks/useEnhancer';
import GlassCard from '@/components/UI/GlassCard';
import { CustomProgress } from '@/components/Progress/CustomProgress';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Upload, Download, RefreshCw, Wand2, AlertTriangle } from 'lucide-react';

export default function ImageHDPage() {
  const { status, originalUrl, resultUrl, errorMessage, reset, startProcessing } = useEnhancer('image');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) startProcessing(e.target.files[0]);
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    try {
      const res = await fetch(resultUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `novapixel-hd-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(resultUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Image <span className="text-purple-500">Enhancer</span>
          </h1>
          <p className="text-gray-400">Transform low-res images into 4K masterpieces instantly.</p>
        </div>

        {/* IDLE: Upload area */}
        {status === 'idle' && (
          <GlassCard className="flex flex-col items-center py-20 border-dashed border-2 border-purple-500/20">
            <div className="p-6 bg-purple-500/10 rounded-full mb-6">
              <Upload size={48} className="text-purple-500" />
            </div>
            <p className="text-gray-400 mb-6 text-sm">JPG, PNG, WEBP — maks 10MB</p>
            <input type="file" id="img-up" hidden accept="image/*" onChange={onFileChange} />
            <label
              htmlFor="img-up"
              className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-2xl font-bold cursor-pointer transition-all text-white"
            >
              Choose Image
            </label>
          </GlassCard>
        )}

        {/* PROCESSING: Loading + progress */}
        {status !== 'idle' && status !== 'completed' && status !== 'error' && (
          <GlassCard className="py-20 text-center">
            <Wand2 className="mx-auto text-purple-500 animate-pulse mb-6" size={48} />
            <CustomProgress status={status} />
          </GlassCard>
        )}

        {/* ERROR: Tampilkan pesan error + retry */}
        {status === 'error' && (
          <GlassCard className="py-16 text-center flex flex-col items-center gap-6">
            <div className="p-4 bg-red-500/10 rounded-full">
              <AlertTriangle size={40} className="text-red-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg mb-2">Proses Gagal</p>
              <p className="text-red-400 text-sm max-w-md mx-auto">
                {errorMessage || 'Terjadi kesalahan. Coba lagi dengan gambar lain.'}
              </p>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-2xl font-bold transition-all text-white"
            >
              <RefreshCw size={18} /> Coba Lagi
            </button>
          </GlassCard>
        )}

        {/* COMPLETED: Before/After slider + Download */}
        {status === 'completed' && resultUrl && originalUrl && (
          <div className="space-y-8">
            {/* Label before/after */}
            <div className="flex justify-between px-2 text-sm font-semibold">
              <span className="text-gray-400">◀ Original</span>
              <span className="text-purple-400">Enhanced HD ▶</span>
            </div>

            <GlassCard className="p-0 overflow-hidden bg-black rounded-2xl">
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src={originalUrl} alt="Original" style={{ objectFit: 'contain' }} />}
                itemTwo={<ReactCompareSliderImage src={resultUrl} alt="Enhanced" style={{ objectFit: 'contain' }} />}
                style={{ height: '500px', width: '100%' }}
              />
            </GlassCard>

            {/* Tombol aksi */}
            <div className="flex justify-center gap-4">
              <button
                onClick={reset}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl transition-all text-white"
              >
                <RefreshCw size={20} /> Try New
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white"
              >
                <Download size={20} /> Download HD
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
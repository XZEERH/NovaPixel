"use client";
import React from 'react';
import { useEnhancer } from '@/hooks/useEnhancer';
import GlassCard from '@/components/UI/GlassCard';
import { CustomProgress } from '@/components/Progress/CustomProgress';
import { VideoSyncPlayer } from '@/components/Compare/VideoSyncPlayer';
import { Upload, Download, RefreshCw, Clapperboard, AlertTriangle } from 'lucide-react';

export default function VideoHDPage() {
  const { status, originalUrl, resultUrl, errorMessage, reset, startProcessing } = useEnhancer('video');

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) startProcessing(file);
  };

  const handleDownload = async () => {
    if (!resultUrl) return;
    try {
      const res = await fetch(resultUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `novapixel-hd-${Date.now()}.mp4`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(resultUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">HD Upscaler</span>
          </h1>
        </div>

        {/* IDLE */}
        {status === 'idle' && (
          <GlassCard className="py-24 text-center border-dashed border-2 border-blue-500/20">
            <input type="file" id="v-up" hidden accept="video/*" onChange={handleVideoUpload} />
            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Clapperboard className="text-blue-500" size={40} />
            </div>
            <p className="text-gray-400 mb-6 text-sm">MP4, MOV, MKV — maks 50MB</p>
            <label
              htmlFor="v-up"
              className="bg-blue-600 px-10 py-4 rounded-2xl font-bold cursor-pointer hover:bg-blue-700 text-white transition-all"
            >
              Select Video
            </label>
          </GlassCard>
        )}

        {/* PROCESSING */}
        {status !== 'idle' && status !== 'completed' && status !== 'error' && (
          <GlassCard className="py-24 text-center">
            <CustomProgress status={status} />
          </GlassCard>
        )}

        {/* ERROR */}
        {status === 'error' && (
          <GlassCard className="py-16 text-center flex flex-col items-center gap-6">
            <div className="p-4 bg-red-500/10 rounded-full">
              <AlertTriangle size={40} className="text-red-400" />
            </div>
            <div>
              <p className="text-white font-bold text-lg mb-2">Proses Gagal</p>
              <p className="text-red-400 text-sm max-w-md mx-auto">
                {errorMessage || 'Terjadi kesalahan. Coba lagi dengan video lain.'}
              </p>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl font-bold transition-all text-white"
            >
              <RefreshCw size={18} /> Coba Lagi
            </button>
          </GlassCard>
        )}

        {/* COMPLETED */}
        {status === 'completed' && resultUrl && originalUrl && (
          <div className="space-y-10">
            <div className="flex justify-between px-2 text-sm font-semibold">
              <span className="text-gray-400">◀ Original</span>
              <span className="text-blue-400">Enhanced HD ▶</span>
            </div>

            <GlassCard className="p-4 bg-black/40 border-white/5">
              <VideoSyncPlayer original={originalUrl} enhanced={resultUrl} />
            </GlassCard>

            <div className="flex justify-center gap-6">
              <button
                onClick={reset}
                className="flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-all"
              >
                <RefreshCw size={18} /> NEW PROCESS
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-5 rounded-2xl font-black text-white hover:scale-105 transition-all"
              >
                <Download size={24} /> DOWNLOAD HD VIDEO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
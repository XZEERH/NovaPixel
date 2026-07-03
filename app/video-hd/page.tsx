"use client";
import React from 'react';
import { useEnhancer } from '@/hooks/useEnhancer';
import GlassCard from '@/components/UI/GlassCard'; // HAPUS KURUNG KURAWAL
import { CustomProgress } from '@/components/Progress/CustomProgress';
import { VideoSyncPlayer } from '@/components/Compare/VideoSyncPlayer';
import { Upload, Download, RefreshCw, Clapperboard } from 'lucide-react';

export default function VideoHDPage() {
  const { status, originalUrl, resultUrl, startProcessing } = useEnhancer('video');

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) startProcessing(file);
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">HD Upscaler</span>
          </h1>
        </div>

        {status === 'idle' && (
          <GlassCard className="py-24 text-center border-dashed border-2 border-blue-500/20">
            <input type="file" id="v-up" hidden accept="video/*" onChange={handleVideoUpload} />
            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Clapperboard className="text-blue-500" size={40} />
            </div>
            <label htmlFor="v-up" className="bg-blue-600 px-10 py-4 rounded-2xl font-bold cursor-pointer hover:bg-blue-700 text-white">
              Select Video
            </label>
          </GlassCard>
        )}

        {(status !== 'idle' && status !== 'completed' && status !== 'error') && (
          <GlassCard className="py-24 text-center">
            <CustomProgress status={status} />
          </GlassCard>
        )}

        {status === 'completed' && resultUrl && originalUrl && (
          <div className="space-y-10">
            <GlassCard className="p-4 bg-black/40 border-white/5">
              <VideoSyncPlayer original={originalUrl} enhanced={resultUrl} />
            </GlassCard>
            <div className="flex justify-center gap-6">
              <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-gray-400 hover:text-white font-bold transition-all">
                <RefreshCw size={18} /> NEW PROCESS
              </button>
              <a href={resultUrl} download className="bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-5 rounded-2xl font-black text-white hover:scale-105 transition-all">
                <Download size={24} /> DOWNLOAD HD VIDEO
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
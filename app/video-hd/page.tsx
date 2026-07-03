"use client";
import { useState } from "react";
import { useEnhancer } from "@/hooks/useEnhancer"; // Menggunakan hook yang sudah dibuat sebelumnya
import { GlassCard } from "@/components/UI/GlassCard";
import { CustomProgress } from "@/components/Progress/CustomProgress";
import { VideoSyncPlayer } from "@/components/Compare/VideoSyncPlayer";
import { Upload, Download, RefreshCw, Clapperboard } from "lucide-react";

export default function VideoHDPage() {
  const { status, originalUrl, resultUrl, startProcessing } = useEnhancer("video");

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) return alert("Video too large (Max 50MB)");
      startProcessing(file);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 container mx-auto pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            AI Video Engine v2.0
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
            Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Super-Resolution</span>
          </h1>
        </div>

        {status === "idle" && (
          <GlassCard className="py-24 text-center border-dashed border-2 border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer relative">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="video/*" onChange={handleVideoUpload} />
            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Clapperboard className="text-blue-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Enhance Your Footage</h2>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">Upload any video to upscale to HD 60FPS with AI stabilization.</p>
            <div className="bg-blue-600 px-10 py-4 rounded-2xl font-bold inline-block shadow-lg shadow-blue-900/20">Select Video File</div>
          </GlassCard>
        )}

        {(status !== "idle" && status !== "completed" && status !== "error") && (
          <GlassCard className="py-24 text-center">
            <div className="mb-10 relative inline-block">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
              <Clapperboard className="text-blue-400 animate-bounce relative z-10" size={64} />
            </div>
            <CustomProgress status={status} />
          </GlassCard>
        )}

        {status === "completed" && resultUrl && originalUrl && (
          <div className="space-y-10">
            <GlassCard className="p-4 bg-black/40 border-white/5">
              <VideoSyncPlayer original={originalUrl} enhanced={resultUrl} />
            </GlassCard>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold">
                <RefreshCw size={18} /> PROCESS ANOTHER
              </button>
              <a href={resultUrl} download className="bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3">
                <Download size={24} /> DOWNLOAD HD VIDEO
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
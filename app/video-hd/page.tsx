"use client";
import { useState, useRef, useEffect } from 'react';
import { useEnhancer } from '@/hooks/useEnhancer';
import { enhanceVideo } from '@/services/ai-service';
import { GlassCard } from '@/components/UI/GlassCard';
import { ProcessingProgressBar } from '@/components/Progress/ProcessingSteps';
import { Download, Upload, Play, Pause } from 'lucide-react';

export default function VideoHDPage() {
  const { status, step, result, original, processFile } = useEnhancer(enhanceVideo);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const handleSyncPlay = () => {
    if (videoRef1.current && videoRef2.current) {
      if (isPlaying) {
        videoRef1.current.pause();
        videoRef2.current.pause();
      } else {
        videoRef1.current.play();
        videoRef2.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onTimeUpdate = (e: any) => {
    if (videoRef2.current) {
      videoRef2.current.currentTime = e.target.currentTime;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        AI Video Upscaler HD
      </h1>

      {status === 'idle' && (
        <GlassCard className="flex flex-col items-center justify-center py-20 border-dashed border-2 border-blue-500/30">
          <Upload className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
          <input type="file" id="v-upload" hidden onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} accept="video/*" />
          <label htmlFor="v-upload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-full font-bold transition-all">
            Upload Video
          </label>
        </GlassCard>
      )}

      {status === 'processing' && (
        <GlassCard className="text-center py-12">
          <ProcessingProgressBar progress={step} />
          <p className="mt-8 text-blue-400 animate-pulse font-medium tracking-widest uppercase text-sm">Processing AI Frames...</p>
        </GlassCard>
      )}

      {status === 'done' && result && original && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <span className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs z-10">ORIGINAL</span>
              <video ref={videoRef1} onTimeUpdate={onTimeUpdate} className="rounded-xl w-full border border-white/10" src={original} muted loop />
            </div>
            <div className="relative">
              <span className="absolute top-4 left-4 bg-purple-600 px-3 py-1 rounded text-xs z-10 tracking-widest">AI ENHANCED</span>
              <video ref={videoRef2} className="rounded-xl w-full border border-purple-500/30" src={result} muted loop />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button onClick={handleSyncPlay} className="p-6 bg-white/10 rounded-full hover:bg-white/20 transition-all border border-white/20">
              {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
            </button>
            
            <div className="flex gap-4">
              <button onClick={() => window.location.reload()} className="px-8 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all">Try Another</button>
              <a href={result} download className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
                <Download size={20} /> Download 4K Video
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
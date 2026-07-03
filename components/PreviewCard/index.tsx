"use client";
import React from "react";
import GlassCard from "../UI/GlassCard"; // FIXED: Import Default (Tanpa kurung kurawal)
import { BeforeAfter } from "../BeforeAfter"; // Tetap Named Export
import DownloadButton from "../UI/DownloadButton"; // Tetap Default Export

interface PreviewCardProps {
  original: string;
  enhanced: string;
  type: 'image' | 'video';
}

export const PreviewCard = ({ original, enhanced, type }: PreviewCardProps) => {
  return (
    <GlassCard className="space-y-6">
      <div className="text-center mb-4">
        <span className="px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
          AI Result Preview
        </span>
      </div>
      
      <div className="relative group">
        <BeforeAfter before={original} after={enhanced} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <button 
          onClick={() => window.location.reload()} 
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-bold text-gray-400 hover:text-white"
        >
          TRY ANOTHER
        </button>
        <div className="w-full sm:w-auto">
          <DownloadButton url={enhanced} type={type} />
        </div>
      </div>
    </GlassCard>
  );
};
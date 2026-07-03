"use client";
import { GlassCard } from "@/components/UI/GlassCard";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0c]">
      <GlassCard className="max-w-md text-center border-red-500/20">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-red-500" size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">{error.message || "An unexpected error occurred during processing."}</p>
        <button onClick={reset} className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-xl flex items-center justify-center gap-2 transition-all font-bold">
          <RotateCcw size={18} /> TRY AGAIN
        </button>
      </GlassCard>
    </div>
  );
}
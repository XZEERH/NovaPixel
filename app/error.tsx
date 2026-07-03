"use client";
import { useEffect } from "react";
import GlassCard from "@/components/UI/GlassCard";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0c]">
      <GlassCard className="max-w-md text-center border-red-500/20">
        <AlertCircle className="text-red-500 mx-auto mb-6" size={48} />
        <h2 className="text-2xl font-bold mb-4 text-white">System Glitch</h2>
        <p className="text-gray-400 mb-8 text-sm">{error.message || "Something went wrong within the pixel matrix."}</p>
        <button onClick={reset} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
          <RotateCcw size={18} /> Reboot Process
        </button>
      </GlassCard>
    </div>
  );
}
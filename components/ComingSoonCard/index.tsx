"use client";
import React from 'react';
import { LucideIcon } from "lucide-react";
import GlassCard from "../UI/GlassCard"; // FIXED: Import Default

export default function ComingSoonCard({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <GlassCard className="h-full opacity-60 grayscale relative overflow-hidden border-white/5">
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-10">
        <div className="px-4 py-2 rounded-full border border-white/20 bg-black/60 text-[10px] font-black uppercase tracking-[0.2em] text-white">
          Access Not Available Yet
        </div>
      </div>
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        <Icon className="text-gray-500" size={28} />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-gray-500">{title}</h3>
      <p className="text-gray-600 leading-relaxed italic text-sm">
        Experimental feature under development by NovaPixel AI Lab.
      </p>
    </GlassCard>
  );
}
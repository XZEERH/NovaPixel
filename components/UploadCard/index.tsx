"use client";
import React from 'react';
import GlassCard from '../UI/GlassCard'; // FIXED: Import Default (Tanpa kurung kurawal)
import { Upload } from 'lucide-react';

interface UploadCardProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  desc: string;
  accept: string;
}

export const UploadCard = ({ onFileChange, title, desc, accept }: UploadCardProps) => (
  <GlassCard className="border-dashed border-2 border-white/10 flex flex-col items-center py-16">
    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
      <Upload size={32} className="text-white/80" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 mb-8 text-center max-w-xs">{desc}</p>
    <input type="file" id="fileIn" hidden onChange={onFileChange} accept={accept} />
    <label 
      htmlFor="fileIn" 
      className="bg-white/90 px-8 py-3 rounded-xl font-bold cursor-pointer hover:bg-white transition-all text-black active:scale-95 shadow-lg shadow-black/20"
    >
      Select File
    </label>
  </GlassCard>
);
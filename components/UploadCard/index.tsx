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
  <GlassCard className="border-dashed border-2 border-purple-500/20 flex flex-col items-center py-16">
    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
      <Upload size={32} className="text-purple-500" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 mb-8 text-center max-w-xs">{desc}</p>
    <input type="file" id="fileIn" hidden onChange={onFileChange} accept={accept} />
    <label 
      htmlFor="fileIn" 
      className="bg-purple-600 px-8 py-3 rounded-xl font-bold cursor-pointer hover:bg-purple-700 transition-all text-white active:scale-95 shadow-lg shadow-purple-900/20"
    >
      Select File
    </label>
  </GlassCard>
);
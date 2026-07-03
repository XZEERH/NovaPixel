"use client";
import { Download } from "lucide-react";
import { downloadFile } from "@/utils/DownloadHelper";

export default function DownloadButton({ url, type }: { url: string; type: string }) {
  const handleDownload = () => {
    const filename = `NovaPixel-${type}-${Date.now()}`;
    downloadFile(url, filename);
  };

  return (
    <button 
      onClick={handleDownload}
      className="bg-gradient-to-r from-purple-600 to-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-purple-600/20 flex items-center gap-3"
    >
      <Download size={24} /> DOWNLOAD HD {type.toUpperCase()}
    </button>
  );
}
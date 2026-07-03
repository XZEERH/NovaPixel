"use client";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VideoError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0c]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/[0.03] border border-blue-500/20 backdrop-blur-xl rounded-[2.5rem] p-10 text-center"
      >
        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-blue-100">Video Processing Error</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          The video server is currently busy or the file format is incompatible. Please check your connection and try again.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold shadow-lg shadow-blue-900/20"
          >
            <RefreshCcw size={18} /> RETRY PROCESS
          </button>
          <Link href="/" className="text-gray-500 hover:text-white text-sm py-2 transition-colors">
            Return to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
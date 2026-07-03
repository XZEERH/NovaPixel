"use client";
import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ImageError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0c]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/[0.03] border border-red-500/20 backdrop-blur-xl rounded-[2.5rem] p-10 text-center"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Image Enhancement Failed</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
          {error.message || "An unexpected error occurred while processing your image. Please try again."}
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={reset}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all font-bold"
          >
            <RotateCcw size={18} /> TRY AGAIN
          </button>
          <Link href="/" className="text-gray-500 hover:text-white text-sm py-2 transition-colors flex items-center justify-center gap-2">
            <Home size={14} /> Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
"use client";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

export default function ImageLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-purple-500/20 blur-[50px] rounded-full" />
        <div className="relative bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <ImageIcon size={48} className="text-purple-500 animate-pulse" />
        </div>
      </motion.div>
      <h2 className="mt-8 text-xl font-bold tracking-widest text-white/80">
        PREPARING <span className="text-purple-500">IMAGE ENGINE</span>...
      </h2>
    </div>
  );
}
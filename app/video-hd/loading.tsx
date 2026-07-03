"use client";
import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

export default function VideoLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] p-6">
      <motion.div
        animate={{ 
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />
        <div className="relative bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <Clapperboard size={48} className="text-blue-400" />
        </div>
      </motion.div>
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-xl font-bold tracking-widest text-white/80">
          INITIALIZING <span className="text-blue-400">VIDEO AI</span>
        </h2>
        <div className="mt-4 flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-2 h-2 bg-blue-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
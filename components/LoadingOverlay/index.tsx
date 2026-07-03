"use client";
import { motion } from "framer-motion";
import { CustomProgress } from "../Progress/CustomProgress";
import { AppStep } from "@/types/global"; // <--- Pastikan alias @/ mengarah ke root

export const LoadingOverlay = ({ step }: { step: AppStep }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
  >
    <div className="max-w-md w-full">
      <CustomProgress status={step} />
      <p className="text-center mt-6 text-purple-400 animate-pulse font-medium tracking-widest uppercase text-[10px]">
        Don't close this tab while AI is working...
      </p>
    </div>
  </motion.div>
);
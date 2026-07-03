"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard; // WAJIB DEFAULT EXPORT
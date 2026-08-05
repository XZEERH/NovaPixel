"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = "" }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "relative overflow-hidden rounded-[2rem] border-[3px] border-black/90 bg-[#101018]/90 p-8 shadow-[10px_10px_0_#000,0_0_35px_rgba(255,255,255,0.05)] backdrop-blur-xl",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%)] opacity-70" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

export default GlassCard;

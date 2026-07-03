"use client";
import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  href: string;
  delay: number;
}

export default function FeatureCard({ title, desc, icon: Icon, href, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <Link href={href} className="group block p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/[0.07] transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
          <Icon size={80} />
        </div>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Icon className="text-white" size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed mb-6">{desc}</p>
        <div className="flex items-center gap-2 text-sm font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
          LAUNCH TOOL <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
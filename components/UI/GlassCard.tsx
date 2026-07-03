import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 ${className}`}
  >
    {children}
  </motion.div>
);
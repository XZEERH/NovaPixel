import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 ${className}`}
  >
    {children}
  </motion.div>
);
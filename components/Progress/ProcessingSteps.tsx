import { motion } from 'framer-motion';

export const ProcessingProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
    />
  </div>
);
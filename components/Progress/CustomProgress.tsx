import { STEPS } from '@/constants/config';
import { ProcessStatus } from '@/types';
import { motion } from 'framer-motion';

export const CustomProgress = ({ status }: { status: ProcessStatus }) => {
  const current = STEPS[status];
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="flex justify-between mb-2 text-sm font-medium text-purple-400">
        <span>{current.label}</span>
        <span>{current.progress}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${current.progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};
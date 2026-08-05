'use client';
import { STEPS } from '@/constants/config';
import { ProcessStatus } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const CustomProgress = ({ status }: { status: ProcessStatus }) => {
  const current = STEPS[status];
  const [animatedProgress, setAnimatedProgress] = useState(current.progress);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === 'enhancing') {
      // Mulai dari 70, naik perlahan ke 92 selama ~90 detik
      setAnimatedProgress(70);
      let val = 70;
      interval = setInterval(() => {
        val += 0.25; // naik 0.25% per 250ms = ~90 detik untuk naik 22%
        if (val >= 92) {
          val = 92;
          if (interval) clearInterval(interval);
        }
        setAnimatedProgress(Math.round(val * 10) / 10);
      }, 250);
    } else if (status === 'rendering') {
      setAnimatedProgress(93);
    } else {
      setAnimatedProgress(current.progress);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const displayProgress = Math.round(animatedProgress);
  const label = status === 'enhancing'
    ? displayProgress < 80
      ? 'Analyzing and enhancing pixels...'
      : 'Almost done, finalizing...'
    : current.label;

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="flex justify-between mb-2 text-sm font-medium text-white/75">
        <span>{label}</span>
        <span>{displayProgress}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-white/80 to-white/35"
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </div>
    </div>
  );
};

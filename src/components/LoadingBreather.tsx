'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingBreatherProps {
  messages: string[];
}

export default function LoadingBreather({ messages }: LoadingBreatherProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div
      className="flex flex-col items-center justify-center py-24 px-4"
      role="status"
      aria-live="polite"
      aria-label="Generating your report"
    >
      {/* Breathing circles */}
      <div className="relative h-32 w-32 mb-10">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full bg-blue-100 animate-breathe"
          style={{ animationDelay: '0s' }}
        />
        {/* Middle ring */}
        <div
          className="absolute inset-4 rounded-full bg-blue-200 animate-breathe"
          style={{ animationDelay: '0.4s' }}
        />
        {/* Inner ring */}
        <div
          className="absolute inset-8 rounded-full bg-[#3B82F6] animate-breathe"
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      {/* Cycling text */}
      <div className="h-8 relative flex items-center justify-center min-w-[280px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute text-base font-medium text-slate-700 text-center"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Duration hint */}
      <p className="mt-6 text-sm text-slate-400">
        This typically takes about 10&ndash;15 seconds
      </p>
    </div>
  );
}

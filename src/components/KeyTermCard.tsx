'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface KeyTermCardProps {
  term: string;
  definition: string;
  whyItMatters: string;
}

export default function KeyTermCard({ term, definition, whyItMatters }: KeyTermCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        expanded
          ? 'bg-blue-50 border-blue-100'
          : 'bg-white border-slate-100 hover:border-slate-200'
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6] rounded-xl"
        aria-expanded={expanded}
      >
        <span className="text-sm font-semibold text-slate-900">{term}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3">
              <p className="text-sm leading-relaxed text-slate-700">{definition}</p>
              <div className="rounded-lg bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Why your doctor might mention this
                </p>
                <p className="text-sm leading-relaxed text-slate-600">{whyItMatters}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

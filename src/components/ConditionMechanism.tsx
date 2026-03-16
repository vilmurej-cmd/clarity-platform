'use client';

import { motion } from 'framer-motion';

interface MechanismStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface ConditionMechanismProps {
  steps: MechanismStep[];
  title?: string;
}

export default function ConditionMechanism({ steps, title }: ConditionMechanismProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6">
      <h4 className="text-sm font-semibold text-slate-900 mb-5">
        {title || 'How This Condition Works'}
      </h4>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-5 top-3 bottom-3 w-px bg-blue-200" aria-hidden="true" />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="relative flex items-start gap-4"
            >
              {/* Step number circle */}
              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg">
                {step.icon || step.step}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <p className="text-sm font-semibold text-slate-800">{step.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow to next step */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 -bottom-2 text-blue-300 text-xs" aria-hidden="true">
                  ↓
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

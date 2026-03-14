'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCopy,
  Heart,
  Printer,
  RotateCcw,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import DisclaimerBanner from '@/components/DisclaimerBanner';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Step = 'input' | 'loading' | 'result';

interface WhatToExpect {
  title: string;
  description: string;
}

interface CopingActivity {
  title: string;
  description: string;
  ageRange?: string;
}

interface KidsReport {
  simpleExplanation: string;
  whatToExpect: WhatToExpect[];
  siblingExplanation: string;
  schoolAccommodationLetter: string;
  copingActivities: CopingActivity[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const AGE_OPTIONS = [
  { value: '3-5', label: '3\u20135 years' },
  { value: '6-8', label: '6\u20138 years' },
  { value: '9-12', label: '9\u201312 years' },
  { value: '13-17', label: '13\u201317 years' },
];

const LOADING_MESSAGES = [
  'Reading about your child\u2019s condition\u2026',
  'Finding the right words\u2026',
  'Making it easy to understand\u2026',
  'Almost ready\u2026',
];

const BUBBLE_COLORS = [
  'bg-blue-300',
  'bg-teal-300',
  'bg-amber-300',
  'bg-rose-300',
  'bg-green-300',
];

const ACTIVITY_BORDERS = [
  'border-blue-200',
  'border-teal-200',
  'border-amber-200',
  'border-rose-200',
];

const ACTIVITY_EMOJI: Record<string, string> = {
  draw: '\uD83C\uDFA8',
  journal: '\uD83D\uDCD3',
  breathe: '\uD83C\uDF2C\uFE0F',
  talk: '\uD83D\uDCAC',
  play: '\uD83C\uDFAE',
  read: '\uD83D\uDCDA',
  music: '\uD83C\uDFB5',
  move: '\uD83C\uDFC3',
  craft: '\u2702\uFE0F',
  cook: '\uD83C\uDF73',
  garden: '\uD83C\uDF31',
  pet: '\uD83D\uDC36',
};

function getActivityEmoji(title: string): string {
  const lower = title.toLowerCase();
  for (const [keyword, emoji] of Object.entries(ACTIVITY_EMOJI)) {
    if (lower.includes(keyword)) return emoji;
  }
  return '\u2B50';
}

/* ------------------------------------------------------------------ */
/*  Floating Bubbles (CSS-only animation via inline keyframes)         */
/* ------------------------------------------------------------------ */

function FloatingBubbles({ count = 5 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 40 + Math.random() * 80;
        const left = 10 + (i / count) * 80;
        const delay = i * 0.7;
        const duration = 6 + Math.random() * 4;
        return (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 ${BUBBLE_COLORS[i % BUBBLE_COLORS.length]}`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: '-10%',
              animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function KidsPage() {
  const [step, setStep] = useState<Step>('input');
  const [diagnosis, setDiagnosis] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [parentDescription, setParentDescription] = useState('');
  const [report, setReport] = useState<KidsReport | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loadingIdx, setLoadingIdx] = useState(0);

  /* Document title */
  useEffect(() => {
    document.title = 'CLARITY Kids \u2014 Help Your Child Understand';
  }, []);

  /* Loading message rotation */
  useEffect(() => {
    if (step !== 'loading') return;
    const interval = setInterval(() => {
      setLoadingIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [step]);

  /* Submit */
  const handleSubmit = useCallback(async () => {
    if (diagnosis.trim().length < 5) return;

    setStep('loading');
    setError('');
    setLoadingIdx(0);

    try {
      const res = await fetch('/api/kids-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnosis: diagnosis.trim(),
          ageRange: ageRange || '6-8',
          parentDescription: parentDescription.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }

      setReport(data.report);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStep('input');
    }
  }, [diagnosis, ageRange, parentDescription]);

  /* Copy school letter */
  const handleCopyLetter = useCallback(async () => {
    if (!report?.schoolAccommodationLetter) return;
    try {
      await navigator.clipboard.writeText(report.schoolAccommodationLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Fallback for older browsers */
      const textarea = document.createElement('textarea');
      textarea.value = report.schoolAccommodationLetter;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [report]);

  /* Reset */
  const handleReset = useCallback(() => {
    setStep('input');
    setDiagnosis('');
    setAgeRange('');
    setParentDescription('');
    setReport(null);
    setError('');
    setCopied(false);
  }, []);

  /* -------------------------------------------------------------- */
  /*  Render: Input Step                                             */
  /* -------------------------------------------------------------- */

  function renderInput() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Warm header area with background bubbles */}
        <div className="relative text-center mb-10 pt-4">
          <FloatingBubbles count={6} />
          <div className="relative z-10">
            <h1 className="font-serif text-4xl sm:text-5xl text-slate-800 mb-4">
              Understanding your child&apos;s health
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mx-auto">
              We&apos;ll help you explain their diagnosis in words they can understand.
            </p>
          </div>
        </div>

        <DisclaimerBanner className="mb-8" />

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {/* Diagnosis textarea */}
          <div>
            <label htmlFor="diagnosis" className="block text-sm font-medium text-slate-700 mb-2">
              What is your child&apos;s diagnosis?
            </label>
            <textarea
              id="diagnosis"
              rows={4}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="My child was diagnosed with..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-shadow resize-none"
            />
          </div>

          {/* Age range select */}
          <div>
            <label htmlFor="ageRange" className="block text-sm font-medium text-slate-700 mb-2">
              Your child&apos;s age range
            </label>
            <select
              id="ageRange"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-shadow appearance-none cursor-pointer"
            >
              <option value="">Select age range...</option>
              {AGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Additional context */}
          <div>
            <label htmlFor="parentDescription" className="block text-sm font-medium text-slate-700 mb-2">
              Anything else we should know?{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="parentDescription"
              rows={3}
              value={parentDescription}
              onChange={(e) => setParentDescription(e.target.value)}
              placeholder="Any concerns, symptoms, or things you'd like us to address..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-shadow resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={diagnosis.trim().length < 5}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-lg px-6 py-4 transition-colors shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-200"
          >
            Help Us Explain
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Encouraging text */}
          <p className="text-center text-sm text-slate-400">
            We&apos;ll create an explanation that&apos;s just right for their age.
          </p>
        </div>
      </motion.div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  Render: Loading Step                                           */
  /* -------------------------------------------------------------- */

  function renderLoading() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center py-24 px-4"
        role="status"
        aria-live="polite"
        aria-label="Generating explanation for your child"
      >
        {/* Floating colored circles */}
        <div className="relative h-40 w-40 mb-12">
          {BUBBLE_COLORS.map((color, i) => {
            const size = 28 + i * 8;
            const offsetX = Math.cos((i * 2 * Math.PI) / BUBBLE_COLORS.length) * 40;
            const offsetY = Math.sin((i * 2 * Math.PI) / BUBBLE_COLORS.length) * 40;
            return (
              <div
                key={i}
                className={`absolute rounded-full ${color}`}
                style={{
                  width: size,
                  height: size,
                  left: `calc(50% + ${offsetX}px - ${size / 2}px)`,
                  top: `calc(50% + ${offsetY}px - ${size / 2}px)`,
                  opacity: 0.6,
                  animation: `gentleBounce 2.5s ease-in-out ${i * 0.35}s infinite`,
                }}
              />
            );
          })}
        </div>

        {/* Cycling text */}
        <div className="h-8 relative flex items-center justify-center min-w-[300px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute text-lg font-medium text-slate-700 text-center"
            >
              {LOADING_MESSAGES[loadingIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-sm text-slate-400">This usually takes about 10&ndash;15 seconds</p>
      </motion.div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  Render: Result Step                                            */
  /* -------------------------------------------------------------- */

  function renderResult() {
    if (!report) return null;

    const ageLabel =
      AGE_OPTIONS.find((o) => o.value === (ageRange || '6-8'))?.label ?? ageRange;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto space-y-8"
      >
        {/* Header + age badge */}
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl text-slate-800 mb-3">
            Here&apos;s How to Explain It
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5">
            <Sparkles className="h-4 w-4" />
            Written for ages {ageLabel}
          </span>
        </div>

        {/* Section 1: For Your Child */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-blue-50 border border-blue-100 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-blue-500" />
            <h2 className="font-serif text-xl text-slate-800">For Your Child</h2>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
            {report.simpleExplanation}
          </p>
        </motion.section>

        {/* Section 2: What to Expect */}
        {report.whatToExpect?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-teal-50 border border-teal-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 className="h-5 w-5 text-teal-500" />
              <h2 className="font-serif text-xl text-slate-800">What to Expect</h2>
            </div>
            <div className="space-y-3">
              {report.whatToExpect.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl bg-white/70 border border-teal-100/60 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                    <p className="text-slate-600 text-sm mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Section 3: For Siblings */}
        {report.siblingExplanation && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-amber-50 border border-amber-100 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-amber-500" />
              <h2 className="font-serif text-xl text-slate-800">For Siblings</h2>
            </div>
            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {report.siblingExplanation}
            </p>
            <div className="mt-4 rounded-xl bg-amber-100/50 border border-amber-200/60 px-4 py-3">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Tip:</span> Let brothers and sisters ask questions
                too. It helps them feel included and less worried.
              </p>
            </div>
          </motion.section>
        )}

        {/* Section 4: School Accommodation Letter */}
        {report.schoolAccommodationLetter && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-slate-800">School Accommodation Letter</h2>
              <button
                type="button"
                onClick={handleCopyLetter}
                className="flex items-center gap-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium px-3 py-1.5 transition-colors"
              >
                <ClipboardCopy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-5 font-mono text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {report.schoolAccommodationLetter}
            </div>
            <p className="mt-3 text-xs text-slate-400 text-center">
              This is a starting point &mdash; review with your child&apos;s doctor before sending.
            </p>
          </motion.section>
        )}

        {/* Section 5: Coping Activities */}
        {report.copingActivities?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-serif text-xl text-slate-800 mb-5 text-center">
              Coping Activities
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {report.copingActivities.map((activity, i) => (
                <div
                  key={i}
                  className={`rounded-xl bg-white border-2 ${ACTIVITY_BORDERS[i % ACTIVITY_BORDERS.length]} p-4 hover:shadow-md transition-shadow`}
                >
                  <div className="text-2xl mb-2">{getActivityEmoji(activity.title)}</div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{activity.title}</p>
                  <p className="text-slate-600 text-xs leading-relaxed">{activity.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Bottom action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-8">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-5 py-3 transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print This Page
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-5 py-3 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Start Over
          </button>
          <Link
            href="/understand"
            className="flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-3 transition-colors shadow-sm"
          >
            Get Full Report
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  Main render                                                    */
  /* -------------------------------------------------------------- */

  return (
    <>
      {/* CSS keyframes for bubble animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-120px) scale(1.1);
            opacity: 0.25;
          }
        }
        @keyframes gentleBounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.08);
          }
        }
      `}</style>

      <div className="min-h-screen px-4 py-10 sm:py-16">
        <AnimatePresence mode="wait">
          {step === 'input' && <motion.div key="input">{renderInput()}</motion.div>}
          {step === 'loading' && <motion.div key="loading">{renderLoading()}</motion.div>}
          {step === 'result' && <motion.div key="result">{renderResult()}</motion.div>}
        </AnimatePresence>
      </div>
    </>
  );
}

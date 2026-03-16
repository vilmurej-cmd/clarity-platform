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
  Star,
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
  { value: '3-5', label: '3\u20135 years', emoji: '🧸' },
  { value: '6-8', label: '6\u20138 years', emoji: '🎨' },
  { value: '9-12', label: '9\u201312 years', emoji: '📚' },
  { value: '13-17', label: '13\u201317 years', emoji: '🎮' },
];

const LOADING_MESSAGES = [
  'Reading about your child\u2019s condition\u2026',
  'Finding the right words\u2026',
  'Making it easy to understand\u2026',
  'Creating fun activities\u2026',
  'Almost ready\u2026',
];

const MASCOT_MESSAGES = [
  "Hi there! I'm Cleo the Owl. Let's learn together!",
  "Don't worry — we'll make this simple and fun!",
  "Every kid deserves to understand what's happening.",
  "Let's turn confusing doctor-talk into kid-talk!",
];

const ACTIVITY_EMOJI: Record<string, string> = {
  draw: '🎨', journal: '📓', breathe: '🌬️', talk: '💬',
  play: '🎮', read: '📚', music: '🎵', move: '🏃',
  craft: '✂️', cook: '🍳', garden: '🌱', pet: '🐶',
};

function getActivityEmoji(title: string): string {
  const lower = title.toLowerCase();
  for (const [keyword, emoji] of Object.entries(ACTIVITY_EMOJI)) {
    if (lower.includes(keyword)) return emoji;
  }
  return '⭐';
}

/* ------------------------------------------------------------------ */
/*  Mascot Component                                                   */
/* ------------------------------------------------------------------ */

function CleoMascot({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="flex-shrink-0 animate-float">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-3xl shadow-lg shadow-orange-200">
          🦉
        </div>
      </div>
      <div className="relative bg-white rounded-2xl rounded-tl-sm border-2 border-orange-200 px-4 py-3 shadow-sm max-w-md">
        <p className="text-sm text-slate-700 font-kids font-medium">{message}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Fun Quiz Component                                                 */
/* ------------------------------------------------------------------ */

function FunFact() {
  const facts = [
    { q: "Your heart beats about 100,000 times a day!", a: "True! That's about 35 million times a year!" },
    { q: "Your brain uses 20% of all your body's energy!", a: "True! That's a lot of power for something that weighs about 3 pounds." },
    { q: "You have more bacteria in your body than human cells!", a: "True! But don't worry — most of them are helpful friends." },
  ];
  const [factIdx] = useState(() => Math.floor(Math.random() * facts.length));
  const [revealed, setRevealed] = useState(false);
  const fact = facts[factIdx];

  return (
    <div className="rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 p-5 text-center">
      <p className="text-lg font-kids font-bold text-purple-800 mb-3">Did You Know? 🤔</p>
      <p className="text-sm font-kids text-purple-700 mb-4">{fact.q}</p>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="rounded-full bg-purple-500 text-white px-5 py-2 text-sm font-kids font-bold hover:bg-purple-600 transition-colors"
        >
          Find Out!
        </button>
      ) : (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm font-kids text-purple-700 font-medium"
        >
          ✅ {fact.a}
        </motion.p>
      )}
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
  const [mascotIdx] = useState(() => Math.floor(Math.random() * MASCOT_MESSAGES.length));

  useEffect(() => {
    document.title = 'CLARITY Kids \u2014 Help Your Child Understand';
  }, []);

  useEffect(() => {
    if (step !== 'loading') return;
    const interval = setInterval(() => {
      setLoadingIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [step]);

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
      if (!res.ok || !data.success) throw new Error(data.error ?? 'Something went wrong.');
      setReport(data.report);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStep('input');
    }
  }, [diagnosis, ageRange, parentDescription]);

  const handleCopyLetter = useCallback(async () => {
    if (!report?.schoolAccommodationLetter) return;
    try {
      await navigator.clipboard.writeText(report.schoolAccommodationLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
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
  /*  INPUT                                                          */
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
        {/* Playful header */}
        <div className="relative text-center mb-8 pt-4">
          <div className="kids-gradient h-2 rounded-full mb-8 opacity-60" />
          <h1 className="font-kids text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4">
            CLARITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">Kids</span>
          </h1>
          <p className="text-lg font-kids text-slate-500 max-w-lg mx-auto">
            Helping kids understand their health, in words that make sense.
          </p>
        </div>

        {/* Mascot */}
        <CleoMascot message={MASCOT_MESSAGES[mascotIdx]} />

        <DisclaimerBanner className="mb-8" />

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 rounded-2xl bg-rose-50 border-2 border-rose-200 px-4 py-3 text-sm text-rose-700 font-kids"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Diagnosis */}
          <div>
            <label htmlFor="diagnosis" className="block text-sm font-kids font-bold text-slate-700 mb-2">
              What did the doctor say is happening? 🩺
            </label>
            <textarea
              id="diagnosis"
              rows={4}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="My child was diagnosed with..."
              className="w-full rounded-2xl border-2 border-orange-200 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-orange-200 focus:border-orange-400 transition-shadow resize-none font-kids"
            />
          </div>

          {/* Age range — fun cards */}
          <div>
            <label className="block text-sm font-kids font-bold text-slate-700 mb-2">
              How old is your child? 🎂
            </label>
            <div className="grid grid-cols-2 gap-3">
              {AGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAgeRange(opt.value)}
                  className={`rounded-2xl border-2 p-4 text-center transition-all font-kids ${
                    ageRange === opt.value
                      ? 'border-orange-400 bg-orange-50 scale-105 shadow-md'
                      : 'border-slate-200 bg-white hover:border-orange-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{opt.emoji}</div>
                  <p className={`text-sm font-bold ${ageRange === opt.value ? 'text-orange-700' : 'text-slate-700'}`}>
                    {opt.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Additional context */}
          <div>
            <label htmlFor="parentDescription" className="block text-sm font-kids font-bold text-slate-700 mb-2">
              Anything else we should know?{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="parentDescription"
              rows={3}
              value={parentDescription}
              onChange={(e) => setParentDescription(e.target.value)}
              placeholder="Any concerns, symptoms, or things you'd like us to address..."
              className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-purple-200 focus:border-purple-400 transition-shadow resize-none font-kids"
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={diagnosis.trim().length < 5}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-kids font-bold text-lg px-6 py-4 transition-all shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:scale-[1.02]"
          >
            <Sparkles className="h-5 w-5" />
            Help Us Explain!
            <ArrowRight className="h-5 w-5" />
          </button>

          <p className="text-center text-sm font-kids text-slate-400">
            We&apos;ll create an explanation that&apos;s just right for their age. ✨
          </p>
        </div>
      </motion.div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  LOADING                                                        */
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
      >
        {/* Fun animated mascot */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl mb-8"
        >
          🦉
        </motion.div>

        {/* Colorful loading dots */}
        <div className="flex gap-3 mb-8">
          {['bg-orange-400', 'bg-pink-400', 'bg-purple-400', 'bg-blue-400', 'bg-green-400'].map((color, i) => (
            <motion.div
              key={i}
              className={`h-4 w-4 rounded-full ${color}`}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        {/* Cycling text */}
        <div className="h-8 relative flex items-center justify-center min-w-[300px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="absolute text-lg font-kids font-bold text-slate-700 text-center"
            >
              {LOADING_MESSAGES[loadingIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-sm font-kids text-slate-400">This usually takes about 10\u201315 seconds</p>
      </motion.div>
    );
  }

  /* -------------------------------------------------------------- */
  /*  RESULT                                                         */
  /* -------------------------------------------------------------- */

  function renderResult() {
    if (!report) return null;

    const ageLabel = AGE_OPTIONS.find((o) => o.value === (ageRange || '6-8'))?.label ?? ageRange;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto space-y-8"
      >
        {/* Colorful header */}
        <div className="text-center">
          <div className="kids-gradient h-2 rounded-full mb-6 opacity-60" />
          <h1 className="font-kids text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">
            Here&apos;s How to Explain It ✨
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 text-orange-700 text-sm font-kids font-bold px-4 py-1.5">
            <Star className="h-4 w-4" />
            Written for ages {ageLabel}
          </span>
        </div>

        {/* Mascot intro */}
        <CleoMascot message="Here you go! I wrote this just for your child. Read it together and feel free to change any words!" />

        {/* Section 1: For Your Child */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-orange-500" />
            <h2 className="font-kids text-xl font-bold text-slate-800">For Your Child</h2>
          </div>
          <p className="text-lg font-kids text-slate-700 leading-relaxed whitespace-pre-line">
            {report.simpleExplanation}
          </p>
        </motion.section>

        {/* Section 2: What to Expect */}
        {report.whatToExpect?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 className="h-5 w-5 text-teal-500" />
              <h2 className="font-kids text-xl font-bold text-slate-800">What to Expect</h2>
            </div>
            <div className="space-y-3">
              {report.whatToExpect.map((item, i) => (
                <div key={i} className="flex gap-3 rounded-2xl bg-white/70 border-2 border-teal-100 p-4">
                  <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-kids font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-kids font-bold text-slate-800 text-sm">{item.title}</p>
                    <p className="font-kids text-slate-600 text-sm mt-0.5">{item.description}</p>
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
            className="rounded-3xl bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-pink-500" />
              <h2 className="font-kids text-xl font-bold text-slate-800">For Brothers & Sisters</h2>
            </div>
            <p className="text-base font-kids text-slate-700 leading-relaxed whitespace-pre-line">
              {report.siblingExplanation}
            </p>
            <div className="mt-4 rounded-2xl bg-pink-100/60 border-2 border-pink-200 px-4 py-3">
              <p className="text-sm font-kids text-pink-800">
                <span className="font-bold">💡 Tip:</span> Let brothers and sisters ask questions too! It helps them feel included and less worried.
              </p>
            </div>
          </motion.section>
        )}

        {/* Fun fact quiz */}
        <FunFact />

        {/* Section 4: School Letter */}
        {report.schoolAccommodationLetter && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-kids text-xl font-bold text-slate-800">School Letter 📝</h2>
              <button
                type="button"
                onClick={handleCopyLetter}
                className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-kids font-bold px-3 py-1.5 transition-colors"
              >
                <ClipboardCopy className="h-4 w-4" />
                {copied ? 'Copied! ✅' : 'Copy'}
              </button>
            </div>
            <div className="rounded-2xl bg-slate-50 border-2 border-slate-100 p-5 font-mono text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {report.schoolAccommodationLetter}
            </div>
            <p className="mt-3 text-xs font-kids text-slate-400 text-center">
              Review with your child&apos;s doctor before sending to school.
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
            <h2 className="font-kids text-xl font-bold text-slate-800 mb-5 text-center">
              Fun Coping Activities 🎨
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {report.copingActivities.map((activity, i) => {
                const colors = [
                  'border-orange-300 bg-orange-50',
                  'border-pink-300 bg-pink-50',
                  'border-purple-300 bg-purple-50',
                  'border-blue-300 bg-blue-50',
                  'border-teal-300 bg-teal-50',
                  'border-green-300 bg-green-50',
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`rounded-2xl border-2 ${colors[i % colors.length]} p-4 hover:scale-105 hover:shadow-md transition-all cursor-default`}
                  >
                    <div className="text-3xl mb-2">{getActivityEmoji(activity.title)}</div>
                    <p className="font-kids font-bold text-slate-800 text-sm mb-1">{activity.title}</p>
                    <p className="font-kids text-slate-600 text-xs leading-relaxed">{activity.description}</p>
                    {activity.ageRange && (
                      <p className="font-kids text-[10px] text-slate-400 mt-2">Ages {activity.ageRange}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-8">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-kids font-bold px-5 py-3 transition-colors">
            <Printer className="h-4 w-4" /> Print This Page
          </button>
          <button onClick={handleReset} className="flex items-center gap-2 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-kids font-bold px-5 py-3 transition-colors">
            <RotateCcw className="h-4 w-4" /> Start Over
          </button>
          <Link href="/understand" className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-kids font-bold px-5 py-3 transition-colors shadow-sm hover:shadow-md">
            Get Full Report <ArrowRight className="h-4 w-4" />
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes floatUp {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-120px) scale(1.1); opacity: 0.25; }
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.08); }
        }
      `}</style>

      <div className="min-h-screen px-4 py-10 sm:py-16 bg-gradient-to-b from-[#FFF7ED] via-white to-[#FFF7ED]">
        <AnimatePresence mode="wait">
          {step === 'input' && <motion.div key="input">{renderInput()}</motion.div>}
          {step === 'loading' && <motion.div key="loading">{renderLoading()}</motion.div>}
          {step === 'result' && <motion.div key="result">{renderResult()}</motion.div>}
        </AnimatePresence>
      </div>
    </>
  );
}

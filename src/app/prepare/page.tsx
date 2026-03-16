'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Printer,
  RotateCcw,
  Lock,
  CheckCircle2,
  Briefcase,
  Stethoscope,
  Shield,
  CalendarDays,
  ClipboardList,
} from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface WhatToExpect {
  title: string;
  description: string;
}

interface PrepResult {
  condition: string;
  appointmentType: string;
  whatToBring: string[];
  whatToExpect: WhatToExpect[];
  howToDescribeSymptoms: string[];
  patientRights: string[];
  afterAppointment: string[];
}

const appointmentTypes = [
  { value: 'first-visit', label: 'First Visit', description: 'Meeting your doctor about this for the first time' },
  { value: 'follow-up', label: 'Follow-Up', description: 'Checking in on your treatment progress' },
  { value: 'specialist', label: 'Specialist Referral', description: 'Seeing a specialist for the first time' },
  { value: 'second-opinion', label: 'Second Opinion', description: 'Getting another doctor\'s perspective' },
];

export default function PreparePage() {
  const [condition, setCondition] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [result, setResult] = useState<PrepResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [daysUntil, setDaysUntil] = useState<number | null>(null);

  // Calculate days until appointment
  useEffect(() => {
    if (!appointmentDate) { setDaysUntil(null); return; }
    const diff = Math.ceil((new Date(appointmentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    setDaysUntil(diff >= 0 ? diff : null);
  }, [appointmentDate]);

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!condition.trim() || !appointmentType) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ condition: condition.trim(), appointmentType }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [condition, appointmentType]);

  const handleReset = () => {
    setCondition('');
    setAppointmentType('');
    setAppointmentDate('');
    setResult(null);
    setError('');
    setCheckedItems(new Set());
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <DisclaimerBanner className="mb-8" />

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Lock className="h-3.5 w-3.5" />
          <span>Nothing you share is stored. Your privacy is absolute.</span>
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="input" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                Prepare for Your Appointment
              </h1>
              <p className="mt-3 text-base text-slate-500">
                Walk into your next appointment confident, prepared, and ready with the right questions.
              </p>

              {error && (
                <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700">{error}</div>
              )}

              <div className="mt-8 space-y-6">
                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">What condition is your appointment about?</label>
                  <input
                    type="text"
                    value={condition}
                    onChange={e => setCondition(e.target.value)}
                    placeholder="e.g., Type 2 Diabetes, breast cancer, knee replacement..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Appointment type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">What type of appointment?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {appointmentTypes.map(type => (
                      <button
                        key={type.value}
                        onClick={() => setAppointmentType(type.value)}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          appointmentType === type.value
                            ? 'border-[#3B82F6] bg-blue-50'
                            : 'border-slate-200 bg-white hover:border-blue-200'
                        }`}
                      >
                        <p className={`text-sm font-semibold ${appointmentType === type.value ? 'text-blue-700' : 'text-slate-800'}`}>
                          {type.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    When is your appointment? <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={e => setAppointmentDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  {daysUntil !== null && (
                    <p className="mt-2 text-sm text-blue-600 font-medium flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {daysUntil === 0 ? "Your appointment is today!" : `${daysUntil} day${daysUntil === 1 ? '' : 's'} until your appointment`}
                    </p>
                  )}
                </div>

                {/* Generate button */}
                <button
                  onClick={handleGenerate}
                  disabled={!condition.trim() || !appointmentType || loading}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:w-auto ${
                    condition.trim() && appointmentType && !loading ? 'animate-blue-pulse' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Preparing Your Packet...
                    </>
                  ) : (
                    <>
                      Prepare Me
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                    Your Appointment Prep Packet
                  </h1>
                  <p className="mt-1 text-sm text-blue-600 font-medium">{result.condition}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {appointmentTypes.find(t => t.value === result.appointmentType)?.label || result.appointmentType}
                    {daysUntil !== null && (
                      <span className="ml-2 text-blue-500 font-medium">
                        {daysUntil === 0 ? '— Today!' : `— ${daysUntil} day${daysUntil === 1 ? '' : 's'} away`}
                      </span>
                    )}
                  </p>
                </div>
                <button onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Printer className="h-4 w-4" /> Print Everything
                </button>
              </div>

              {/* Countdown timer */}
              {daysUntil !== null && daysUntil > 0 && (
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 mb-8 text-center">
                  <p className="text-5xl font-bold text-blue-600">{daysUntil}</p>
                  <p className="text-sm text-slate-600 mt-1">day{daysUntil === 1 ? '' : 's'} until your appointment</p>
                </div>
              )}

              <div className="space-y-10">
                {/* What to Bring */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-500" /> What to Bring
                  </h2>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-3">
                    {result.whatToBring.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkedItems.has(`bring-${i}`)}
                          onChange={() => toggleCheck(`bring-${i}`)}
                          className="h-5 w-5 rounded border-blue-200 text-blue-500 cursor-pointer"
                        />
                        <span className={`text-sm transition-colors ${
                          checkedItems.has(`bring-${i}`) ? 'text-slate-400 line-through' : 'text-slate-700'
                        }`}>{item}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* What to Expect */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-teal-500" /> What to Expect
                  </h2>
                  <div className="space-y-3">
                    {result.whatToExpect.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 rounded-xl border border-slate-100 bg-white p-4"
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 text-sm font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* How to Describe Symptoms */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-amber-500" /> How to Describe Your Symptoms
                  </h2>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
                    <p className="text-sm text-slate-600 mb-4">Before your appointment, think through these prompts:</p>
                    <div className="space-y-3">
                      {result.howToDescribeSymptoms.map((prompt, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-amber-400 mt-0.5">→</span>
                          <div className="flex-1">
                            <p className="text-sm text-slate-700">{prompt}</p>
                            <div className="mt-1 h-6 border-b border-dashed border-slate-200" aria-label="space for your answer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Patient Rights */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-500" /> Your Rights as a Patient
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {result.patientRights.map((right, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-purple-50 bg-purple-50/50 p-4">
                        <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-slate-700">{right}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* After Appointment */}
                <section>
                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">After Your Appointment</h2>
                  <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5 space-y-3">
                    {result.afterAppointment.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkedItems.has(`after-${i}`)}
                          onChange={() => toggleCheck(`after-${i}`)}
                          className="h-5 w-5 rounded border-green-200 text-green-500 cursor-pointer"
                        />
                        <span className={`text-sm transition-colors ${
                          checkedItems.has(`after-${i}`) ? 'text-slate-400 line-through' : 'text-slate-700'
                        }`}>{item}</span>
                      </label>
                    ))}
                  </div>
                </section>
              </div>

              {/* Bottom actions */}
              <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:justify-center">
                <button onClick={handleReset} className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <RotateCcw className="h-4 w-4" /> Prepare for a Different Appointment
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Nothing you shared was stored. Your privacy is absolute.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

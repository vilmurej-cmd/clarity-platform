'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X, ArrowRight, Printer, RotateCcw, Lock, AlertTriangle, CheckCircle2, AlertCircle, Clock, Utensils } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Interaction {
  medications: string[];
  severity: 'green' | 'yellow' | 'red';
  title: string;
  description: string;
  recommendation: string;
}

interface FoodInteraction {
  medication: string;
  food: string;
  severity: 'green' | 'yellow' | 'red';
  description: string;
}

interface TimingNote {
  medication: string;
  note: string;
}

interface MedResult {
  medications: string[];
  interactions: Interaction[];
  foodInteractions: FoodInteraction[];
  timingNotes: TimingNote[];
}

const severityConfig = {
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: CheckCircle2, label: 'No Significant Interaction', bar: 'bg-green-400' },
  yellow: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: AlertCircle, label: 'Minor Interaction', bar: 'bg-amber-400' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: AlertTriangle, label: 'Potential Serious Interaction', bar: 'bg-red-400' },
};

export default function MedicationsPage() {
  const [medications, setMedications] = useState<string[]>([]);
  const [currentMed, setCurrentMed] = useState('');
  const [result, setResult] = useState<MedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addMedication = () => {
    const med = currentMed.trim();
    if (med && !medications.includes(med)) {
      setMedications(prev => [...prev, med]);
      setCurrentMed('');
    }
  };

  const removeMedication = (med: string) => {
    setMedications(prev => prev.filter(m => m !== med));
  };

  const handleCheck = useCallback(async () => {
    if (medications.length < 2) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medications }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [medications]);

  const handleReset = () => {
    setMedications([]);
    setResult(null);
    setError('');
    setCurrentMed('');
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
                Medication Interaction Checker
              </h1>
              <p className="mt-3 text-base text-slate-500">
                Enter your current medications to check for potential interactions, food conflicts, and timing guidance.
              </p>

              {error && (
                <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700">{error}</div>
              )}

              {/* Medication input */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Add your medications</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentMed}
                    onChange={e => setCurrentMed(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addMedication()}
                    placeholder="e.g., Metformin, Lisinopril, Aspirin..."
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    onClick={addMedication}
                    disabled={!currentMed.trim()}
                    className="rounded-xl bg-[#3B82F6] px-5 py-3 text-white font-semibold hover:bg-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Medication list */}
              {medications.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-slate-500 mb-3">Your medications ({medications.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {medications.map(med => (
                      <span key={med} className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700">
                        {med}
                        <button onClick={() => removeMedication(med)} className="text-blue-400 hover:text-blue-600 transition-colors" aria-label={`Remove ${med}`}>
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Check button */}
              <div className="mt-8">
                <button
                  onClick={handleCheck}
                  disabled={medications.length < 2 || loading}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:w-auto ${
                    medications.length >= 2 && !loading ? 'animate-blue-pulse' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Checking Interactions...
                    </>
                  ) : (
                    <>
                      Check Interactions
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
                {medications.length < 2 && medications.length > 0 && (
                  <p className="mt-2 text-xs text-slate-400">Add at least 2 medications to check for interactions.</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                    Interaction Report
                  </h1>
                  <p className="mt-1 text-sm text-slate-400">
                    {result.medications.length} medications analyzed
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <Printer className="h-4 w-4" /> Print
                  </button>
                </div>
              </div>

              {/* Medication pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {result.medications.map(med => (
                  <span key={med} className="rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700">
                    {med}
                  </span>
                ))}
              </div>

              {/* Drug Interactions */}
              <div className="space-y-4 mb-10">
                <h2 className="font-serif text-xl font-bold text-slate-900">Drug-Drug Interactions</h2>
                {result.interactions.map((interaction, i) => {
                  const config = severityConfig[interaction.severity];
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-2xl border-l-4 ${config.border} ${config.bg} p-5`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${config.text}`} />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold uppercase tracking-wider ${config.text}`}>{config.label}</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-800">{interaction.medications.join(' + ')}</p>
                          <p className="text-sm text-slate-600 mt-1">{interaction.description}</p>
                          <p className="text-xs text-slate-500 mt-2 italic">{interaction.recommendation}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Food Interactions */}
              {result.foodInteractions.length > 0 && (
                <div className="space-y-4 mb-10">
                  <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-slate-400" /> Food Interactions
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {result.foodInteractions.map((fi, i) => {
                      const config = severityConfig[fi.severity];
                      return (
                        <div key={i} className={`rounded-xl border ${config.border} ${config.bg} p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${config.bar}`} />
                            <span className="text-sm font-semibold text-slate-800">{fi.medication} + {fi.food}</span>
                          </div>
                          <p className="text-xs text-slate-600">{fi.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Timing Notes */}
              {result.timingNotes.length > 0 && (
                <div className="space-y-4 mb-10">
                  <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-slate-400" /> When to Take Your Medications
                  </h2>
                  <div className="rounded-2xl border border-slate-100 bg-white divide-y divide-slate-100">
                    {result.timingNotes.map((tn, i) => (
                      <div key={i} className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-800">{tn.medication}</p>
                        <p className="text-xs text-slate-500 mt-1">{tn.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Important Disclaimer</p>
                    <p className="text-xs text-amber-700 mt-1">
                      This tool is for educational purposes only. It does not replace professional medical advice. Always consult your pharmacist or doctor about medication interactions. They have access to your complete medical history and can provide personalized guidance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset */}
              <div className="flex justify-center">
                <button onClick={handleReset} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <RotateCcw className="h-4 w-4" /> Check Different Medications
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

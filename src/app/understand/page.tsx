'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Printer, RotateCcw } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import LoadingBreather from '@/components/LoadingBreather';
import ReportTabs from '@/components/ReportTabs';
import type { ReportData } from '@/components/ReportTabs';
import PrintableQuestions from '@/components/PrintableQuestions';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Step = 'input' | 'loading' | 'report';

interface FormData {
  description: string;
  ageRange: string;
  diagnosedWhen: string;
  currentTreatments: string;
  otherConditions: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/* ------------------------------------------------------------------ */
/*  Helpers — map API response → ReportData for ReportTabs             */
/* ------------------------------------------------------------------ */

function mapApiToReportData(raw: any): ReportData {
  // Map treatments
  const treatments = (raw.treatmentOptions ?? []).map((t: any) => ({
    name: t.name,
    type: t.type as 'medication' | 'procedure' | 'therapy' | 'lifestyle',
    howItWorks: t.howItWorks,
    effectiveness: t.effectivenessScore ?? 5,
    effectivenessLabel: t.effectiveness,
    whatItInvolves: t.involves ?? t.whatItInvolves ?? '',
    timeline: t.timeline,
    sideEffects: (t.sideEffects ?? []).map((se: any) => ({
      name: se.effect ?? se.name ?? '',
      severity: se.severity ?? 'mild',
    })),
    questionsToAsk: t.questionsToAsk ?? [],
  }));

  // Map questions
  const questionMap: Record<string, string> = {
    aboutDiagnosis: 'About Your Diagnosis',
    aboutTreatment: 'About Treatment',
    aboutDailyLife: 'About Daily Life',
    aboutOutlook: 'About Your Outlook',
    aboutSupport: 'About Support',
  };

  const questions = Object.entries(raw.questionsForDoctor ?? {}).map(
    ([key, qs]: [string, any]) => ({
      category: questionMap[key] ?? key,
      questions: (qs ?? []).map((q: any) => ({
        question: q.question,
        whyItMatters: q.whyItMatters,
      })),
    })
  );

  // Map support organizations
  const organizations = (raw.supportOrganizations ?? []).map((org: any) => ({
    name: org.name,
    description: org.description,
    url: org.website ?? org.url,
  }));

  // Map living-with tips
  const livingWith = raw.livingWith ?? {};
  const dailyTips = (livingWith.dailyTips ?? []).map((tip: any) =>
    typeof tip === 'string' ? { title: '', description: tip } : tip
  );
  const watchFor = (livingWith.watchFor ?? []).map((item: any) =>
    typeof item === 'string'
      ? { sign: item, action: 'Discuss with your doctor.' }
      : item
  );

  return {
    understanding: {
      summary: raw.diagnosisSummary ?? '',
      prevalence: raw.prevalence ?? '',
      causes: raw.causes ?? '',
      keyTerms: raw.keyTerms ?? [],
    },
    treatments,
    questions,
    support: {
      clinicalTrials: {
        overview:
          'Clinical trials test new treatments before they become widely available. Participating in a trial can give you access to cutting-edge therapies.',
        searchTip: `Search ClinicalTrials.gov for "${raw.clinicalTrialSearchTerm ?? raw.conditionName ?? 'your condition'}" to find studies near you.`,
      },
      organizations,
      financialResources: [],
    },
    livingWithIt: {
      dailyTips,
      watchFor,
      emotionalHealth: livingWith.emotionalHealth ?? '',
      forCaregivers: livingWith.forCaregivers ?? '',
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Placeholder rotation for textarea                                  */
/* ------------------------------------------------------------------ */

const placeholders = [
  'I was diagnosed with Type 2 diabetes...',
  'My doctor said I have early-stage breast cancer...',
  'My child was diagnosed with asthma...',
  "I've been told I have rheumatoid arthritis...",
];

/* ------------------------------------------------------------------ */
/*  Category → prefill text mapping                                    */
/* ------------------------------------------------------------------ */

const categoryPrefill: Record<string, string> = {
  cancer: 'I was recently diagnosed with cancer...',
  diabetes: 'I was diagnosed with diabetes...',
  heart: 'I have a heart or cardiovascular condition...',
  autoimmune: 'I was diagnosed with an autoimmune disease...',
  'mental-health': 'I am dealing with a mental health condition...',
  respiratory: 'I have a respiratory condition...',
  neurological: 'I was diagnosed with a neurological condition...',
  'childrens-health': 'My child was diagnosed with a health condition...',
  'chronic-pain': 'I have been dealing with chronic pain...',
  'rare-diseases': 'I was diagnosed with a rare disease...',
  'womens-health': "I have a women's health condition...",
  'mens-health': "I have a men's health condition...",
};

/* ------------------------------------------------------------------ */
/*  Inner component that reads searchParams (needs Suspense boundary)  */
/* ------------------------------------------------------------------ */

function UnderstandInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? '';

  const [step, setStep] = useState<Step>('input');
  const [form, setForm] = useState<FormData>({
    description: category ? categoryPrefill[category] ?? '' : '',
    ageRange: '',
    diagnosedWhen: '',
    currentTreatments: '',
    otherConditions: '',
  });
  const [showDetails, setShowDetails] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [report, setReport] = useState<ReportData | null>(null);
  const [diagnosisSummary, setDiagnosisSummary] = useState('');
  const [error, setError] = useState('');

  // Rotate placeholder text
  useEffect(() => {
    if (form.description) return; // Don't rotate if user has typed
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [form.description]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (form.description.trim().length < 10) return;

    setStep('loading');
    setError('');

    try {
      const res = await fetch('/api/understand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: form.description.trim(),
          ageRange: form.ageRange || undefined,
          diagnosedWhen: form.diagnosedWhen || undefined,
          currentTreatments: form.currentTreatments.trim() || undefined,
          otherConditions: form.otherConditions.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }

      const mapped = mapApiToReportData(data.report);
      setReport(mapped);
      setDiagnosisSummary(data.report.diagnosisSummary ?? '');
      setStep('report');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStep('input');
    }
  }, [form]);

  // Reset to start
  const handleReset = () => {
    setStep('input');
    setForm({
      description: '',
      ageRange: '',
      diagnosedWhen: '',
      currentTreatments: '',
      otherConditions: '',
    });
    setReport(null);
    setDiagnosisSummary('');
    setError('');
  };

  const isValid = form.description.trim().length >= 10;

  return (
    <div className="min-h-screen pb-20">
      <AnimatePresence mode="wait">
        {/* ============================================================ */}
        {/*  STEP 1: Input                                                */}
        {/* ============================================================ */}
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6 sm:pt-16">
              <DisclaimerBanner className="mb-8" />

              <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                In your own words, what did your doctor tell you?
              </h1>
              <p className="mt-3 text-base text-slate-500">
                Describe your diagnosis, condition, or anything you were told.
                We&rsquo;ll translate it into language you can understand.
              </p>

              {/* Error message */}
              {error && (
                <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              {/* Main textarea */}
              <div className="mt-8">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder={placeholders[placeholderIdx]}
                  className="w-full min-h-[150px] rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100 resize-y"
                  aria-label="Describe your diagnosis or condition"
                />
              </div>

              {/* Expandable detail section */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowDetails((prev) => !prev)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#3B82F6]"
                  aria-expanded={showDetails}
                >
                  Want to add more detail?
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {/* Age Range */}
                        <div>
                          <label
                            htmlFor="ageRange"
                            className="block text-sm font-medium text-slate-700 mb-1"
                          >
                            Age range
                          </label>
                          <select
                            id="ageRange"
                            value={form.ageRange}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                ageRange: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="">Select...</option>
                            <option value="Under 18">Under 18</option>
                            <option value="18-30">18-30</option>
                            <option value="31-45">31-45</option>
                            <option value="46-60">46-60</option>
                            <option value="61-75">61-75</option>
                            <option value="75+">75+</option>
                          </select>
                        </div>

                        {/* When diagnosed */}
                        <div>
                          <label
                            htmlFor="diagnosedWhen"
                            className="block text-sm font-medium text-slate-700 mb-1"
                          >
                            When were you diagnosed?
                          </label>
                          <select
                            id="diagnosedWhen"
                            value={form.diagnosedWhen}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                diagnosedWhen: e.target.value,
                              }))
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="">Select...</option>
                            <option value="Just now">Just now</option>
                            <option value="Days ago">Days ago</option>
                            <option value="Weeks ago">Weeks ago</option>
                            <option value="Months ago">Months ago</option>
                            <option value="Years ago">Years ago</option>
                          </select>
                        </div>

                        {/* Current treatments */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="currentTreatments"
                            className="block text-sm font-medium text-slate-700 mb-1"
                          >
                            Current treatments (if any)
                          </label>
                          <input
                            id="currentTreatments"
                            type="text"
                            value={form.currentTreatments}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                currentTreatments: e.target.value,
                              }))
                            }
                            placeholder="e.g., Metformin, physical therapy..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* Other conditions */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="otherConditions"
                            className="block text-sm font-medium text-slate-700 mb-1"
                          >
                            Other conditions
                          </label>
                          <input
                            id="otherConditions"
                            type="text"
                            value={form.otherConditions}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                otherConditions: e.target.value,
                              }))
                            }
                            placeholder="e.g., high blood pressure, anxiety..."
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-[#2563EB] hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:w-auto"
                >
                  Help Me Understand
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Warm encouragement */}
              <p className="mt-6 text-center text-sm text-slate-400 sm:text-left">
                There are no wrong answers. Every journey starts with
                understanding.
              </p>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/*  STEP 2: Loading                                              */}
        {/* ============================================================ */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6 sm:pt-16">
              {/* Patient's description card */}
              <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
                  You told us
                </p>
                <p className="text-sm leading-relaxed text-slate-700 italic">
                  &ldquo;{form.description}&rdquo;
                </p>
              </div>

              <LoadingBreather
                messages={[
                  'Reading the latest research...',
                  'Translating medical terminology...',
                  'Finding treatment options...',
                  'Preparing questions for your doctor...',
                  'Building your personalized report...',
                ]}
              />
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/*  STEP 3: Report                                               */}
        {/* ============================================================ */}
        {step === 'report' && report && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-16">
              {/* Report header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
                    Your Clarity Report
                  </h1>
                  <p className="mt-1 text-sm text-slate-400">
                    Generated{' '}
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                  aria-label="Print report"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Print
                </button>
              </div>

              {/* Diagnosis summary card */}
              {diagnosisSummary && (
                <div className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
                    Your Diagnosis, Simply Put
                  </h2>
                  <p className="text-base leading-relaxed text-slate-800">
                    {diagnosisSummary}
                  </p>
                </div>
              )}

              {/* Report tabs */}
              <ReportTabs
                report={report}
                patientDescription={form.description}
              />

              {/* Bottom actions */}
              <div className="mt-12 flex flex-col items-center gap-4 border-t border-slate-100 pt-8 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Start a New Report
                </button>
              </div>

              <DisclaimerBanner className="mt-10" />

              {/* Printable questions (hidden on screen, visible in print) */}
              <PrintableQuestions
                questions={[]}
                conditionName={form.description}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page wrapper with Suspense for useSearchParams                     */
/* ------------------------------------------------------------------ */

export default function UnderstandPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-[#3B82F6]" />
        </div>
      }
    >
      <UnderstandInner />
    </Suspense>
  );
}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Pill,
  MessageCircleQuestion,
  HeartHandshake,
  Leaf,
  Printer,
  Mail,
  Plus,
  ChevronDown,
  ChevronUp,
  Info,
  Check,
  Wind,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import KeyTermCard from './KeyTermCard';
import TreatmentCard from './TreatmentCard';
import type { Treatment } from './TreatmentCard';
import PrintableQuestions from './PrintableQuestions';
import DisclaimerBanner from './DisclaimerBanner';
import BodyDiagram from './BodyDiagram';
import SeverityIndicator from './SeverityIndicator';
import ConditionMechanism from './ConditionMechanism';

/* ------------------------------------------------------------------ */
/*  Type definitions                                                    */
/* ------------------------------------------------------------------ */

interface KeyTerm {
  term: string;
  definition: string;
  whyItMatters: string;
}

interface MechanismStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface QuestionItem {
  question: string;
  whyItMatters: string;
}

interface SupportResource {
  name: string;
  description: string;
  url?: string;
}

interface FoodItem {
  name: string;
  icon: string;
  reason: string;
}

interface ExerciseItem {
  name: string;
  icon: string;
  duration: string;
  frequency: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  safetyNote: string;
}

interface WatchForSign {
  sign: string;
  action: string;
}

export interface ReportData {
  understanding: {
    summary: string;
    prevalence: string;
    causes: string;
    keyTerms: KeyTerm[];
  };
  severity?: 'manageable' | 'moderate' | 'serious' | 'critical';
  affectedBodyRegions?: string[];
  conditionName?: string;
  mechanismSteps?: MechanismStep[];
  treatments: Treatment[];
  questions: {
    askFirst?: QuestionItem[];
    alsoAsk?: QuestionItem[];
    ifTimeAllows?: QuestionItem[];
    // Legacy format support
    category?: string;
    questions?: QuestionItem[];
  }[];
  support: {
    clinicalTrials?: { overview: string; searchTip: string };
    organizations?: SupportResource[];
    financialResources?: { name: string; description: string }[];
    // Enhanced format
    medical?: SupportResource[];
    medication?: SupportResource[];
    supportGroups?: SupportResource[];
    financial?: { name: string; description: string }[];
    mentalHealth?: SupportResource[];
    nutrition?: SupportResource[];
    exercise?: { name: string; description: string }[];
  };
  livingWithIt: {
    dailyTips?: { title: string; description: string }[];
    dailyChecklist?: string[];
    foodGuide?: {
      eat: FoodItem[];
      moderate: FoodItem[];
      limit: FoodItem[];
    };
    exercises?: ExerciseItem[];
    watchFor: WatchForSign[];
    emotionalHealth: string;
    copingStrategies?: string[];
    forCaregivers: string;
  };
}

interface ReportTabsProps {
  report: ReportData;
  patientDescription: string;
}

/* ------------------------------------------------------------------ */
/*  Tab config                                                         */
/* ------------------------------------------------------------------ */

interface TabConfig {
  id: string;
  label: string;
  icon: LucideIcon;
}

const tabs: TabConfig[] = [
  { id: 'understanding', label: 'Understanding', icon: BookOpen },
  { id: 'treatments', label: 'Treatments', icon: Pill },
  { id: 'questions', label: 'Questions', icon: MessageCircleQuestion },
  { id: 'support', label: 'Support', icon: HeartHandshake },
  { id: 'living', label: 'Living With It', icon: Leaf },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ReportTabs({ report, patientDescription }: ReportTabsProps) {
  const [activeTab, setActiveTab] = useState('understanding');
  const tabListRef = useRef<HTMLDivElement>(null);
  const [checkedQuestions, setCheckedQuestions] = useState<Set<string>>(new Set());
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [checklist, setChecklist] = useState<Set<number>>(new Set());
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [expandedTreatments, setExpandedTreatments] = useState<Set<string>>(new Set());
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Set<number>>(new Set());
  const [wellnessRating, setWellnessRating] = useState<number | null>(null);

  // Load checklist from localStorage
  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const saved = localStorage.getItem('clarity-checklist-date');
      if (saved !== today) {
        localStorage.removeItem('clarity-checklist');
        localStorage.setItem('clarity-checklist-date', today);
      } else {
        const items = localStorage.getItem('clarity-checklist');
        if (items) setChecklist(new Set(JSON.parse(items)));
      }
    } catch { /* localStorage unavailable */ }
  }, []);

  const toggleChecklist = (idx: number) => {
    setChecklist(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      try { localStorage.setItem('clarity-checklist', JSON.stringify([...next])); } catch { /* */ }
      return next;
    });
  };

  const toggleQuestion = (key: string) => {
    setCheckedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const addCustomQuestion = () => {
    if (newQuestion.trim()) {
      setCustomQuestions(prev => [...prev, newQuestion.trim()]);
      setNewQuestion('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = tabs.length - 1;
    else return;
    e.preventDefault();
    setActiveTab(tabs[nextIdx].id);
    const btns = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    btns?.[nextIdx]?.focus();
  };

  const getSelectedQuestions = useCallback(() => {
    const selected: string[] = [];
    checkedQuestions.forEach(key => selected.push(key));
    return [...selected, ...customQuestions];
  }, [checkedQuestions, customQuestions]);

  const handlePrintQuestions = () => window.print();

  const handleEmailQuestions = () => {
    const selected = getSelectedQuestions();
    if (selected.length === 0) return;
    const body = selected.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    const subject = 'My Questions for My Doctor - Prepared with CLARITY';
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Breathing exercise
  useEffect(() => {
    if (!breathingActive) return;
    const phases = [
      { phase: 'inhale' as const, duration: 4000 },
      { phase: 'hold' as const, duration: 4000 },
      { phase: 'exhale' as const, duration: 6000 },
    ];
    let phaseIdx = 0;
    let timeout: NodeJS.Timeout;

    const runPhase = () => {
      setBreathPhase(phases[phaseIdx].phase);
      timeout = setTimeout(() => {
        phaseIdx = (phaseIdx + 1) % phases.length;
        runPhase();
      }, phases[phaseIdx].duration);
    };
    runPhase();
    return () => clearTimeout(timeout);
  }, [breathingActive]);

  // Determine question format (new priority-based or legacy category-based)
  const hasNewQuestionFormat = report.questions && !Array.isArray(report.questions);
  const questionData = hasNewQuestionFormat ? report.questions as unknown as {
    askFirst?: QuestionItem[];
    alsoAsk?: QuestionItem[];
    ifTimeAllows?: QuestionItem[];
  } : null;

  // Support resources — handle both formats
  const supportData = report.support;

  const renderResourceSection = (title: string, emoji: string, items: SupportResource[] | { name: string; description: string }[] | undefined) => {
    if (!items || items.length === 0) return null;
    return (
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <span>{emoji}</span> {title}
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.name} className="rounded-xl border border-slate-100 bg-white p-4">
              <h5 className="text-sm font-semibold text-slate-900">{item.name}</h5>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.description}</p>
              {'url' in item && item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-medium text-[#3B82F6] hover:underline">
                  Visit website →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Tab bar */}
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Report sections"
        className="flex overflow-x-auto border-b border-slate-200 scrollbar-hide"
      >
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className="py-8">
        {/* ============ UNDERSTANDING TAB ============ */}
        <div
          role="tabpanel"
          id="panel-understanding"
          aria-labelledby="tab-understanding"
          hidden={activeTab !== 'understanding'}
          tabIndex={0}
          className="space-y-8 animate-fade-in-up"
        >
          {activeTab === 'understanding' && (
            <>
              {/* Two-column: Body Diagram + Summary */}
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  {/* Summary card */}
                  <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Your Diagnosis, Explained
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {report.understanding.summary}
                    </p>
                  </div>

                  {/* Severity */}
                  {report.severity && <SeverityIndicator level={report.severity} />}
                </div>

                {/* Body diagram */}
                {report.affectedBodyRegions && report.affectedBodyRegions.length > 0 && (
                  <div className="flex justify-center">
                    <BodyDiagram
                      highlightedRegions={report.affectedBodyRegions}
                      conditionName={report.conditionName}
                    />
                  </div>
                )}
              </div>

              {/* How It Works mechanism */}
              {report.mechanismSteps && report.mechanismSteps.length > 0 && (
                <ConditionMechanism steps={report.mechanismSteps} />
              )}

              {/* Prevalence */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">How Common Is This?</h3>
                <p className="text-sm leading-relaxed text-slate-600">{report.understanding.prevalence}</p>
              </div>

              {/* Causes */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">What Causes It?</h3>
                <p className="text-sm leading-relaxed text-slate-600">{report.understanding.causes}</p>
              </div>

              {/* Key Terms with tooltips */}
              {report.understanding.keyTerms.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">Key Terms to Know</h3>
                  <div className="space-y-2">
                    {report.understanding.keyTerms.map((kt) => (
                      <KeyTermCard key={kt.term} term={kt.term} definition={kt.definition} whyItMatters={kt.whyItMatters} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ============ TREATMENTS TAB ============ */}
        <div
          role="tabpanel"
          id="panel-treatments"
          aria-labelledby="tab-treatments"
          hidden={activeTab !== 'treatments'}
          tabIndex={0}
          className="animate-fade-in-up"
        >
          {activeTab === 'treatments' && (
            <div className="space-y-6">
              {/* Compare mode toggle */}
              {report.treatments.length > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">{report.treatments.length} treatment options your doctor may discuss</p>
                  <button
                    onClick={() => { setCompareMode(!compareMode); setSelectedForCompare(new Set()); }}
                    className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                      compareMode
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {compareMode ? 'Exit Compare' : 'Compare Treatments'}
                  </button>
                </div>
              )}

              {/* Compare selection hint */}
              {compareMode && (
                <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700">
                  Select 2-3 treatments to compare side-by-side
                </div>
              )}

              {/* Comparison Table */}
              {compareMode && selectedForCompare.size >= 2 && (
                <div className="overflow-x-auto rounded-2xl border border-blue-100">
                  <table className="w-full text-sm">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-700">Feature</th>
                        {[...selectedForCompare].map(idx => (
                          <th key={idx} className="px-4 py-3 text-left font-semibold text-blue-700">
                            {report.treatments[idx]?.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-50">
                      <tr>
                        <td className="px-4 py-3 text-slate-500 font-medium">Type</td>
                        {[...selectedForCompare].map(idx => (
                          <td key={idx} className="px-4 py-3 capitalize">{report.treatments[idx]?.type}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-slate-500 font-medium">Effectiveness</td>
                        {[...selectedForCompare].map(idx => (
                          <td key={idx} className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <div className="h-2 rounded-full bg-blue-200 w-20">
                                <div className="h-2 rounded-full bg-blue-500" style={{ width: `${(report.treatments[idx]?.effectiveness || 0) * 10}%` }} />
                              </div>
                              <span className="text-xs text-slate-500">{report.treatments[idx]?.effectiveness}/10</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-slate-500 font-medium">Timeline</td>
                        {[...selectedForCompare].map(idx => (
                          <td key={idx} className="px-4 py-3 text-xs">{report.treatments[idx]?.timeline}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-slate-500 font-medium">Side Effects</td>
                        {[...selectedForCompare].map(idx => (
                          <td key={idx} className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {report.treatments[idx]?.sideEffects.map(se => (
                                <span key={se.name} className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  se.severity === 'mild' ? 'bg-green-50 text-green-600' :
                                  se.severity === 'moderate' ? 'bg-amber-50 text-amber-600' :
                                  'bg-rose-50 text-rose-600'
                                }`}>{se.name}</span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Treatment cards */}
              <div className="grid gap-6 sm:grid-cols-2">
                {report.treatments.map((t, idx) => (
                  <div key={t.name} className="relative">
                    {compareMode && (
                      <button
                        onClick={() => {
                          setSelectedForCompare(prev => {
                            const next = new Set(prev);
                            if (next.has(idx)) next.delete(idx);
                            else if (next.size < 3) next.add(idx);
                            return next;
                          });
                        }}
                        className={`absolute -top-2 -right-2 z-10 h-7 w-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedForCompare.has(idx)
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-white border-slate-300 text-slate-400 hover:border-blue-300'
                        }`}
                      >
                        {selectedForCompare.has(idx) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </button>
                    )}
                    <TreatmentCard treatment={t} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ============ QUESTIONS TAB ============ */}
        <div
          role="tabpanel"
          id="panel-questions"
          aria-labelledby="tab-questions"
          hidden={activeTab !== 'questions'}
          tabIndex={0}
          className="space-y-8 animate-fade-in-up"
        >
          {activeTab === 'questions' && (
            <>
              {/* Action bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 px-5 py-3">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-[#3B82F6]">{checkedQuestions.size + customQuestions.length}</span>{' '}
                  questions selected
                </p>
                <div className="flex gap-2">
                  <button type="button" onClick={handlePrintQuestions} disabled={checkedQuestions.size + customQuestions.length === 0}
                    className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                    <Printer className="h-4 w-4" /> Print
                  </button>
                  <button type="button" onClick={handleEmailQuestions} disabled={checkedQuestions.size + customQuestions.length === 0}
                    className="no-print inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed">
                    <Mail className="h-4 w-4" /> Email
                  </button>
                </div>
              </div>

              {/* Priority-based questions (new format) */}
              {questionData ? (
                <>
                  {questionData.askFirst && questionData.askFirst.length > 0 && (
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-400" /> Ask First — Most Important
                      </h3>
                      <ul className="space-y-3" role="list">
                        {questionData.askFirst.map((q, i) => {
                          const key = `first-${i}`;
                          return (
                            <li key={key} className="flex gap-3 p-3 rounded-xl border border-red-50 bg-red-50/30 hover:bg-red-50/60 transition-colors">
                              <input type="checkbox" checked={checkedQuestions.has(q.question)} onChange={() => toggleQuestion(q.question)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#3B82F6] cursor-pointer" />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-slate-900">{q.question}</span>
                                <span className="flex items-start gap-1 mt-1 text-xs text-slate-400">
                                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />{q.whyItMatters}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {questionData.alsoAsk && questionData.alsoAsk.length > 0 && (
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-amber-400" /> Also Ask — Good Follow-ups
                      </h3>
                      <ul className="space-y-3" role="list">
                        {questionData.alsoAsk.map((q, i) => {
                          const key = `also-${i}`;
                          return (
                            <li key={key} className="flex gap-3 p-3 rounded-xl border border-amber-50 bg-amber-50/30 hover:bg-amber-50/60 transition-colors">
                              <input type="checkbox" checked={checkedQuestions.has(q.question)} onChange={() => toggleQuestion(q.question)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#3B82F6] cursor-pointer" />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-slate-900">{q.question}</span>
                                <span className="flex items-start gap-1 mt-1 text-xs text-slate-400">
                                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />{q.whyItMatters}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {questionData.ifTimeAllows && questionData.ifTimeAllows.length > 0 && (
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-green-400" /> If Time Allows
                      </h3>
                      <ul className="space-y-3" role="list">
                        {questionData.ifTimeAllows.map((q, i) => {
                          const key = `time-${i}`;
                          return (
                            <li key={key} className="flex gap-3 p-3 rounded-xl border border-green-50 bg-green-50/30 hover:bg-green-50/60 transition-colors">
                              <input type="checkbox" checked={checkedQuestions.has(q.question)} onChange={() => toggleQuestion(q.question)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#3B82F6] cursor-pointer" />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-slate-900">{q.question}</span>
                                <span className="flex items-start gap-1 mt-1 text-xs text-slate-400">
                                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />{q.whyItMatters}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                /* Legacy category-based questions */
                Array.isArray(report.questions) && report.questions.map((group: { category?: string; questions?: QuestionItem[] }, catIdx: number) => (
                  <div key={catIdx}>
                    <h3 className="text-base font-semibold text-slate-900 mb-3">{group.category}</h3>
                    <ul className="space-y-3" role="list">
                      {(group.questions || []).map((q: QuestionItem, qIdx: number) => (
                        <li key={`${catIdx}-${qIdx}`} className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                          <input type="checkbox" checked={checkedQuestions.has(q.question)} onChange={() => toggleQuestion(q.question)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-[#3B82F6] cursor-pointer" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-slate-900">{q.question}</span>
                            <span className="block mt-0.5 text-xs text-slate-400">{q.whyItMatters}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}

              {/* Add custom question */}
              <div className="rounded-xl border border-dashed border-slate-200 p-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Add Your Own Question</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={e => setNewQuestion(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCustomQuestion()}
                    placeholder="Type a question you want to ask..."
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <button onClick={addCustomQuestion} disabled={!newQuestion.trim()}
                    className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {customQuestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {customQuestions.map((q, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-blue-50 rounded-lg px-3 py-2">
                        <Check className="h-4 w-4 text-blue-500" />
                        {q}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ============ SUPPORT TAB ============ */}
        <div
          role="tabpanel"
          id="panel-support"
          aria-labelledby="tab-support"
          hidden={activeTab !== 'support'}
          tabIndex={0}
          className="space-y-8 animate-fade-in-up"
        >
          {activeTab === 'support' && (
            <>
              {/* Clinical Trials */}
              {supportData.clinicalTrials && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">Clinical Trials</h3>
                  <p className="text-sm text-slate-600 mb-2">{supportData.clinicalTrials.overview}</p>
                  <div className="rounded-xl bg-teal-50 border border-teal-100 px-5 py-3">
                    <p className="text-sm text-teal-800"><strong>Tip:</strong> {supportData.clinicalTrials.searchTip}</p>
                  </div>
                </div>
              )}

              {/* Resource sections */}
              {renderResourceSection('Medical Resources', '🏥', supportData.medical)}
              {renderResourceSection('Medication Assistance', '💊', supportData.medication)}
              {renderResourceSection('Support Groups', '🤝', supportData.supportGroups)}
              {renderResourceSection('Financial Help', '💰', supportData.financial)}
              {renderResourceSection('Mental Health', '🧠', supportData.mentalHealth)}
              {renderResourceSection('Nutrition', '🍎', supportData.nutrition)}
              {renderResourceSection('Exercise', '🏃', supportData.exercise)}

              {/* Legacy organizations format */}
              {supportData.organizations && supportData.organizations.length > 0 && !supportData.medical && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">Support Organizations</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {supportData.organizations.map(org => (
                      <div key={org.name} className="rounded-xl border border-slate-100 bg-white p-5">
                        <h4 className="text-sm font-semibold text-slate-900">{org.name}</h4>
                        <p className="mt-1 text-xs text-slate-500">{org.description}</p>
                        {org.url && <a href={org.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-medium text-[#3B82F6] hover:underline">Visit website →</a>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy note */}
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-5 py-3 flex items-center gap-3">
                <span className="text-lg">🔒</span>
                <p className="text-xs text-slate-500">CLARITY does not share your information with any of these organizations. All links open in a new tab.</p>
              </div>
            </>
          )}
        </div>

        {/* ============ LIVING WITH IT TAB ============ */}
        <div
          role="tabpanel"
          id="panel-living"
          aria-labelledby="tab-living"
          hidden={activeTab !== 'living'}
          tabIndex={0}
          className="space-y-8 animate-fade-in-up"
        >
          {activeTab === 'living' && (
            <>
              {/* Daily Checklist */}
              {report.livingWithIt.dailyChecklist && report.livingWithIt.dailyChecklist.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-slate-900">Your Daily Checklist</h3>
                    <span className="text-xs text-slate-400">Resets each day</span>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-3">
                    {report.livingWithIt.dailyChecklist.map((item, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 cursor-pointer group checklist-item ${checklist.has(idx) ? 'checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={checklist.has(idx)}
                          onChange={() => toggleChecklist(idx)}
                          className="h-5 w-5 rounded border-blue-200 text-blue-500 cursor-pointer"
                        />
                        <span className={`text-sm checklist-text transition-colors ${
                          checklist.has(idx) ? 'text-slate-400 line-through' : 'text-slate-700'
                        }`}>
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-xs text-slate-400">
                    {checklist.size} of {report.livingWithIt.dailyChecklist.length} complete today
                  </p>
                </div>
              )}

              {/* Food Guide */}
              {report.livingWithIt.foodGuide && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Food Guide</h3>

                  {/* Eat Freely */}
                  {report.livingWithIt.foodGuide.eat.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> Eat Freely
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {report.livingWithIt.foodGuide.eat.map(food => (
                          <div key={food.name} className="food-green rounded-xl bg-green-50 p-3 text-center">
                            <div className="text-2xl mb-1">{food.icon}</div>
                            <p className="text-sm font-medium text-slate-800">{food.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{food.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* In Moderation */}
                  {report.livingWithIt.foodGuide.moderate.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> In Moderation
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {report.livingWithIt.foodGuide.moderate.map(food => (
                          <div key={food.name} className="food-yellow rounded-xl bg-amber-50 p-3 text-center">
                            <div className="text-2xl mb-1">{food.icon}</div>
                            <p className="text-sm font-medium text-slate-800">{food.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{food.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Limit */}
                  {report.livingWithIt.foodGuide.limit.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Limit or Avoid
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {report.livingWithIt.foodGuide.limit.map(food => (
                          <div key={food.name} className="food-red rounded-xl bg-red-50 p-3 text-center">
                            <div className="text-2xl mb-1">{food.icon}</div>
                            <p className="text-sm font-medium text-slate-800">{food.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{food.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Exercise Guide */}
              {report.livingWithIt.exercises && report.livingWithIt.exercises.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Exercise Guide</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {report.livingWithIt.exercises.map(ex => (
                      <div key={ex.name} className="rounded-xl border border-slate-100 bg-white p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{ex.icon}</span>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">{ex.name}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              ex.difficulty === 'easy' ? 'bg-green-50 text-green-600' :
                              ex.difficulty === 'moderate' ? 'bg-amber-50 text-amber-600' :
                              'bg-red-50 text-red-600'
                            }`}>{ex.difficulty}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-slate-500">
                          <p><span className="font-medium text-slate-600">Duration:</span> {ex.duration}</p>
                          <p><span className="font-medium text-slate-600">Frequency:</span> {ex.frequency}</p>
                          <p className="text-[10px] text-slate-400 italic mt-2">{ex.safetyNote}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Legacy daily tips */}
              {report.livingWithIt.dailyTips && report.livingWithIt.dailyTips.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">Daily Living Tips</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {report.livingWithIt.dailyTips.map(tip => (
                      <div key={tip.title} className="rounded-xl border border-slate-100 bg-white p-5">
                        <h4 className="text-sm font-semibold text-slate-900">{tip.title}</h4>
                        <p className="mt-1 text-xs text-slate-500">{tip.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Watch-for signs */}
              {report.livingWithIt.watchFor.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">Signs to Watch For</h3>
                  <div className="rounded-xl border border-amber-100 bg-amber-50 divide-y divide-amber-100">
                    {report.livingWithIt.watchFor.map(item => (
                      <div key={item.sign} className="px-5 py-3">
                        <p className="text-sm font-medium text-amber-900">{item.sign}</p>
                        <p className="mt-0.5 text-xs text-amber-700">{item.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emotional Health */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Emotional Health</h3>
                <div className="rounded-2xl bg-purple-50 border border-purple-100 p-6">
                  <p className="text-sm leading-relaxed text-slate-700">{report.livingWithIt.emotionalHealth}</p>
                </div>
              </div>

              {/* Coping Strategies */}
              {report.livingWithIt.copingStrategies && report.livingWithIt.copingStrategies.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">Coping Strategies</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {report.livingWithIt.copingStrategies.map((strategy, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4">
                        <span className="text-blue-400 mt-0.5 text-sm">✦</span>
                        <p className="text-sm text-slate-700">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guided Breathing Exercise */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">Guided Breathing</h3>
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center">
                  {!breathingActive ? (
                    <>
                      <p className="text-sm text-slate-600 mb-4">Take a moment to breathe. This 4-4-6 breathing exercise can help reduce anxiety and stress.</p>
                      <button
                        onClick={() => setBreathingActive(true)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
                      >
                        <Wind className="h-4 w-4" /> Start Breathing Exercise
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="relative h-32 w-32 mx-auto mb-4">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-blue-300"
                          animate={{
                            scale: breathPhase === 'inhale' ? 1.3 : breathPhase === 'hold' ? 1.3 : 1,
                            opacity: breathPhase === 'inhale' ? 0.8 : breathPhase === 'hold' ? 0.6 : 0.3,
                          }}
                          transition={{ duration: breathPhase === 'exhale' ? 6 : 4, ease: 'easeInOut' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-blue-800">
                            {breathPhase === 'inhale' ? 'Breathe In' : breathPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">
                        {breathPhase === 'inhale' ? 'Breathe in through your nose for 4 seconds...' :
                         breathPhase === 'hold' ? 'Hold your breath for 4 seconds...' :
                         'Slowly exhale through your mouth for 6 seconds...'}
                      </p>
                      <button
                        onClick={() => setBreathingActive(false)}
                        className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        Stop
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Wellness Check-in */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">How Are You Feeling Today?</h3>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    {[
                      { emoji: '😔', label: 'Struggling', value: 1 },
                      { emoji: '😐', label: 'Okay', value: 2 },
                      { emoji: '🙂', label: 'Good', value: 3 },
                      { emoji: '😊', label: 'Great', value: 4 },
                      { emoji: '🌟', label: 'Amazing', value: 5 },
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setWellnessRating(option.value);
                          try {
                            const history = JSON.parse(localStorage.getItem('clarity-wellness') || '[]');
                            history.push({ date: new Date().toISOString(), rating: option.value });
                            localStorage.setItem('clarity-wellness', JSON.stringify(history.slice(-30)));
                          } catch { /* */ }
                        }}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                          wellnessRating === option.value
                            ? 'bg-blue-50 border-2 border-blue-200 scale-110'
                            : 'border-2 border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="text-[10px] text-slate-500">{option.label}</span>
                      </button>
                    ))}
                  </div>
                  {wellnessRating && (
                    <p className="text-xs text-slate-400 mt-2">Logged. Remember: every day is different, and that's okay.</p>
                  )}
                </div>
              </div>

              {/* For Caregivers */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">For Caregivers</h3>
                <p className="text-sm leading-relaxed text-slate-600">{report.livingWithIt.forCaregivers}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <DisclaimerBanner className="mt-4" />

      {/* Printable questions */}
      <PrintableQuestions questions={getSelectedQuestions()} conditionName={patientDescription} />
    </div>
  );
}

'use client';

import { useState, useMemo, useRef } from 'react';
import KeyTermCard from './KeyTermCard';
import TreatmentCard from './TreatmentCard';
import type { Treatment } from './TreatmentCard';
import QuestionList from './QuestionList';
import type { QuestionCategory } from './QuestionList';
import PrintableQuestions from './PrintableQuestions';
import DisclaimerBanner from './DisclaimerBanner';
import {
  BookOpen,
  Pill,
  MessageCircleQuestion,
  HeartHandshake,
  Leaf,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Type definitions for the full report object                        */
/* ------------------------------------------------------------------ */

interface KeyTerm {
  term: string;
  definition: string;
  whyItMatters: string;
}

interface SupportOrg {
  name: string;
  description: string;
  url?: string;
}

interface FinancialResource {
  name: string;
  description: string;
}

interface ClinicalTrialsInfo {
  overview: string;
  searchTip: string;
}

interface DailyTip {
  title: string;
  description: string;
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
  treatments: Treatment[];
  questions: QuestionCategory[];
  support: {
    clinicalTrials: ClinicalTrialsInfo;
    organizations: SupportOrg[];
    financialResources: FinancialResource[];
  };
  livingWithIt: {
    dailyTips: DailyTip[];
    watchFor: WatchForSign[];
    emotionalHealth: string;
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
  { id: 'treatments', label: 'Treatment Options', icon: Pill },
  { id: 'questions', label: 'Questions for Your Doctor', icon: MessageCircleQuestion },
  { id: 'support', label: 'Finding Support', icon: HeartHandshake },
  { id: 'living', label: 'Living With It', icon: Leaf },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ReportTabs({ report, patientDescription }: ReportTabsProps) {
  const [activeTab, setActiveTab] = useState('understanding');
  const tabListRef = useRef<HTMLDivElement>(null);

  // Build flat checked-question list for PrintableQuestions
  const [checkedForPrint] = useState<string[]>([]);

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
        {/* Understanding */}
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
              {/* Summary card */}
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Your Diagnosis, Explained
                </h3>
                <p className="text-sm leading-relaxed text-slate-700">
                  {report.understanding.summary}
                </p>
              </div>

              {/* Prevalence */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  How Common Is This?
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {report.understanding.prevalence}
                </p>
              </div>

              {/* Causes */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  What Causes It?
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {report.understanding.causes}
                </p>
              </div>

              {/* Key Terms */}
              {report.understanding.keyTerms.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">
                    Key Terms to Know
                  </h3>
                  <div className="space-y-2">
                    {report.understanding.keyTerms.map((kt) => (
                      <KeyTermCard
                        key={kt.term}
                        term={kt.term}
                        definition={kt.definition}
                        whyItMatters={kt.whyItMatters}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Treatments */}
        <div
          role="tabpanel"
          id="panel-treatments"
          aria-labelledby="tab-treatments"
          hidden={activeTab !== 'treatments'}
          tabIndex={0}
          className="animate-fade-in-up"
        >
          {activeTab === 'treatments' && (
            <div className="grid gap-6 sm:grid-cols-2">
              {report.treatments.map((t) => (
                <TreatmentCard key={t.name} treatment={t} />
              ))}
            </div>
          )}
        </div>

        {/* Questions */}
        <div
          role="tabpanel"
          id="panel-questions"
          aria-labelledby="tab-questions"
          hidden={activeTab !== 'questions'}
          tabIndex={0}
          className="animate-fade-in-up"
        >
          {activeTab === 'questions' && (
            <QuestionList questionGroups={report.questions} />
          )}
        </div>

        {/* Support */}
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
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Clinical Trials
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 mb-2">
                  {report.support.clinicalTrials.overview}
                </p>
                <div className="rounded-xl bg-teal-50 border border-teal-100 px-5 py-3">
                  <p className="text-sm text-teal-800">
                    <strong>Tip:</strong> {report.support.clinicalTrials.searchTip}
                  </p>
                </div>
              </div>

              {/* Organizations */}
              {report.support.organizations.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">
                    Support Organizations
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {report.support.organizations.map((org) => (
                      <div
                        key={org.name}
                        className="rounded-xl border border-slate-100 bg-white p-5"
                      >
                        <h4 className="text-sm font-semibold text-slate-900">
                          {org.name}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {org.description}
                        </p>
                        {org.url && (
                          <a
                            href={org.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-xs font-medium text-[#3B82F6] hover:underline"
                          >
                            Visit website &rarr;
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial Resources */}
              {report.support.financialResources.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">
                    Financial Resources
                  </h3>
                  <ul className="space-y-3" role="list">
                    {report.support.financialResources.map((fr) => (
                      <li
                        key={fr.name}
                        className="rounded-xl border border-slate-100 bg-white px-5 py-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          {fr.name}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {fr.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Living With It */}
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
              {/* Daily tips */}
              {report.livingWithIt.dailyTips.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">
                    Daily Living Tips
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {report.livingWithIt.dailyTips.map((tip) => (
                      <div
                        key={tip.title}
                        className="rounded-xl border border-slate-100 bg-white p-5"
                      >
                        <h4 className="text-sm font-semibold text-slate-900">
                          {tip.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Watch-for signs */}
              {report.livingWithIt.watchFor.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-3">
                    Signs to Watch For
                  </h3>
                  <div className="rounded-xl border border-amber-100 bg-amber-50 divide-y divide-amber-100">
                    {report.livingWithIt.watchFor.map((item) => (
                      <div key={item.sign} className="px-5 py-3">
                        <p className="text-sm font-medium text-amber-900">
                          {item.sign}
                        </p>
                        <p className="mt-0.5 text-xs text-amber-700">
                          {item.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emotional health */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Emotional Health
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {report.livingWithIt.emotionalHealth}
                </p>
              </div>

              {/* Caregivers */}
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  For Caregivers
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {report.livingWithIt.forCaregivers}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Disclaimer at bottom */}
      <DisclaimerBanner className="mt-4" />

      {/* Printable questions (hidden, shows only in print) */}
      <PrintableQuestions questions={checkedForPrint} conditionName={patientDescription} />
    </div>
  );
}

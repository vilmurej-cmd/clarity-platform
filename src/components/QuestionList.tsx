'use client';

import { useState, useMemo, useCallback } from 'react';
import { Printer, Mail } from 'lucide-react';

export interface QuestionCategory {
  category: string;
  questions: {
    question: string;
    whyItMatters: string;
  }[];
}

interface QuestionListProps {
  questionGroups: QuestionCategory[];
}

export default function QuestionList({ questionGroups }: QuestionListProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const allQuestions = useMemo(
    () => questionGroups.flatMap((g) => g.questions),
    [questionGroups]
  );

  const totalCount = allQuestions.length;
  const checkedCount = checked.size;

  const toggleQuestion = useCallback((key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const makeKey = (catIdx: number, qIdx: number) => `${catIdx}-${qIdx}`;

  const getSelectedQuestions = useCallback(() => {
    const selected: string[] = [];
    questionGroups.forEach((group, catIdx) => {
      group.questions.forEach((q, qIdx) => {
        if (checked.has(makeKey(catIdx, qIdx))) {
          selected.push(q.question);
        }
      });
    });
    return selected;
  }, [questionGroups, checked]);

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const selected = getSelectedQuestions();
    if (selected.length === 0) return;
    const body = selected.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    const subject = 'My Questions for My Doctor - Prepared with CLARITY';
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="space-y-8">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 px-5 py-3">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-[#3B82F6]">{checkedCount}</span>{' '}
          of {totalCount} questions selected
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            disabled={checkedCount === 0}
            className="no-print inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            aria-label="Print selected questions"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print Selected
          </button>
          <button
            type="button"
            onClick={handleEmail}
            disabled={checkedCount === 0}
            className="no-print inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            aria-label="Email selected questions"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email My Questions
          </button>
        </div>
      </div>

      {/* Question groups */}
      {questionGroups.map((group, catIdx) => (
        <div key={catIdx}>
          <h3 className="text-base font-semibold text-slate-900 mb-3">
            {group.category}
          </h3>
          <ul className="space-y-3" role="list">
            {group.questions.map((q, qIdx) => {
              const key = makeKey(catIdx, qIdx);
              const isChecked = checked.has(key);
              return (
                <li key={key} className="flex gap-3">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      id={`q-${key}`}
                      checked={isChecked}
                      onChange={() => toggleQuestion(key)}
                      className="h-4 w-4 rounded border-slate-300 text-[#3B82F6] focus:ring-[#3B82F6] cursor-pointer"
                      aria-label={q.question}
                    />
                  </div>
                  <label htmlFor={`q-${key}`} className="flex-1 cursor-pointer">
                    <span className="text-sm font-medium text-slate-900">
                      {q.question}
                    </span>
                    <span className="block mt-0.5 text-xs leading-relaxed text-slate-400">
                      {q.whyItMatters}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

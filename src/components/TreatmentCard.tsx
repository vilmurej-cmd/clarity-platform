import { Clock } from 'lucide-react';
import EffectivenessVisual from './EffectivenessVisual';

interface SideEffect {
  name: string;
  severity: 'mild' | 'moderate' | 'serious';
}

export interface Treatment {
  name: string;
  type: 'medication' | 'procedure' | 'therapy' | 'lifestyle';
  howItWorks: string;
  effectiveness: number;
  effectivenessLabel?: string;
  whatItInvolves: string;
  timeline: string;
  sideEffects: SideEffect[];
  questionsToAsk: string[];
}

const typeBadge: Record<Treatment['type'], { label: string; emoji: string; classes: string }> = {
  medication: { label: 'Medication', emoji: '\uD83D\uDC8A', classes: 'bg-blue-50 text-blue-700 border-blue-100' },
  procedure: { label: 'Procedure', emoji: '\uD83C\uDFE5', classes: 'bg-teal-50 text-teal-700 border-teal-100' },
  therapy: { label: 'Therapy', emoji: '\uD83E\uDDE0', classes: 'bg-purple-50 text-purple-700 border-purple-100' },
  lifestyle: { label: 'Lifestyle', emoji: '\uD83C\uDF3F', classes: 'bg-green-50 text-green-700 border-green-100' },
};

const severityColor: Record<SideEffect['severity'], string> = {
  mild: 'text-green-600 bg-green-50',
  moderate: 'text-amber-600 bg-amber-50',
  serious: 'text-rose-600 bg-rose-50',
};

interface TreatmentCardProps {
  treatment: Treatment;
}

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
  const badge = typeBadge[treatment.type];

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">{treatment.name}</h3>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${badge.classes}`}
        >
          <span aria-hidden="true">{badge.emoji}</span>
          {badge.label}
        </span>
      </div>

      {/* How it works */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          How it works
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">{treatment.howItWorks}</p>
      </div>

      {/* Effectiveness */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Effectiveness
        </h4>
        <EffectivenessVisual
          score={treatment.effectiveness}
          label={treatment.effectivenessLabel}
        />
      </div>

      {/* What it involves */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          What it involves
        </h4>
        <p className="text-sm leading-relaxed text-slate-600">{treatment.whatItInvolves}</p>
      </div>

      {/* Timeline */}
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-slate-400" aria-hidden="true" />
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
            Timeline
          </h4>
          <p className="text-sm text-slate-600">{treatment.timeline}</p>
        </div>
      </div>

      {/* Side effects */}
      {treatment.sideEffects.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Possible side effects
          </h4>
          <div className="flex flex-wrap gap-2">
            {treatment.sideEffects.map((se) => (
              <span
                key={se.name}
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${severityColor[se.severity]}`}
              >
                {se.name}
                <span className="sr-only"> ({se.severity})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Questions to ask */}
      {treatment.questionsToAsk.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Questions to ask your doctor
          </h4>
          <ul className="space-y-1.5 list-disc list-inside">
            {treatment.questionsToAsk.map((q, i) => (
              <li key={i} className="text-sm text-slate-600">
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

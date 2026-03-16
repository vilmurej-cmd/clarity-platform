'use client';

interface SeverityIndicatorProps {
  level: 'manageable' | 'moderate' | 'serious' | 'critical';
}

const LEVELS = [
  { key: 'manageable', label: 'Manageable', color: 'bg-green-400', textColor: 'text-green-700', description: 'This condition is typically well-controlled with treatment.' },
  { key: 'moderate', label: 'Moderate', color: 'bg-amber-400', textColor: 'text-amber-700', description: 'Requires ongoing attention and treatment but is treatable.' },
  { key: 'serious', label: 'Serious', color: 'bg-orange-400', textColor: 'text-orange-700', description: 'Requires close medical supervision and treatment.' },
  { key: 'critical', label: 'Critical', color: 'bg-red-400', textColor: 'text-red-700', description: 'Requires immediate and intensive medical care.' },
];

export default function SeverityIndicator({ level }: SeverityIndicatorProps) {
  const activeIndex = LEVELS.findIndex(l => l.key === level);
  const activeLevel = LEVELS[activeIndex] || LEVELS[0];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Condition Severity
      </h4>

      <div className="flex items-center gap-2 mb-3">
        {LEVELS.map((l, i) => (
          <div key={l.key} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={`w-full h-2 rounded-full transition-all duration-500 ${
                i <= activeIndex ? l.color : 'bg-slate-100'
              } ${i === activeIndex ? 'animate-[severityPulse_2s_ease-in-out_infinite]' : ''}`}
            />
            <span className={`text-[10px] font-medium ${
              i === activeIndex ? l.textColor : 'text-slate-300'
            }`}>
              {l.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        {activeLevel.description}
      </p>
      <p className="text-[10px] text-slate-400 mt-2 italic">
        Your doctor can explain exactly where you are on this scale.
      </p>
    </div>
  );
}

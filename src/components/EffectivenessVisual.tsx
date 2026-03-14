import { User } from 'lucide-react';

interface EffectivenessVisualProps {
  score: number;
  label?: string;
}

export default function EffectivenessVisual({ score, label }: EffectivenessVisualProps) {
  const clamped = Math.min(10, Math.max(0, Math.round(score)));

  return (
    <div aria-label={`Effectiveness: ${clamped} out of 10`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <User
            key={i}
            className={`h-4 w-4 ${
              i < clamped ? 'text-[#3B82F6]' : 'text-gray-200'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-slate-500">
        {label || `Helps approximately ${clamped} out of 10 people`}
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface BodyDiagramProps {
  highlightedRegions: string[];
  conditionName?: string;
}

const REGION_LABELS: Record<string, string> = {
  brain: 'Brain',
  lungs: 'Lungs',
  heart: 'Heart',
  liver: 'Liver',
  stomach: 'Stomach',
  pancreas: 'Pancreas',
  kidneys: 'Kidneys',
  intestines: 'Intestines',
  bones: 'Bones & Joints',
  skin: 'Skin',
  blood: 'Blood Vessels',
  thyroid: 'Thyroid',
  eyes: 'Eyes',
  spine: 'Spine',
  muscles: 'Muscles',
};

export default function BodyDiagram({ highlightedRegions, conditionName }: BodyDiagramProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const isHighlighted = (region: string) => highlightedRegions.includes(region);

  const regionColor = (region: string) => {
    if (isHighlighted(region)) return 'fill-blue-400 opacity-70';
    return 'fill-slate-200 opacity-30';
  };

  const glowFilter = (region: string) => {
    if (isHighlighted(region)) return 'url(#blueGlow)';
    return undefined;
  };

  return (
    <div className="relative flex flex-col items-center">
      {conditionName && (
        <p className="text-xs font-medium text-blue-500 uppercase tracking-wider mb-3">
          Areas affected by {conditionName}
        </p>
      )}

      <div className="relative w-48 h-80 sm:w-56 sm:h-96">
        <svg
          viewBox="0 0 200 360"
          className="w-full h-full"
          aria-label={`Human body diagram${highlightedRegions.length > 0 ? ` highlighting ${highlightedRegions.map(r => REGION_LABELS[r] || r).join(', ')}` : ''}`}
          role="img"
        >
          <defs>
            <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor="#3B82F6" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Body silhouette */}
          <g opacity="0.15">
            {/* Head */}
            <ellipse cx="100" cy="35" rx="22" ry="28" fill="url(#bodyGrad)" />
            {/* Neck */}
            <rect x="92" y="60" width="16" height="15" rx="4" fill="url(#bodyGrad)" />
            {/* Torso */}
            <path d="M70,75 Q65,85 62,120 Q60,160 65,200 L80,200 Q85,195 100,195 Q115,195 120,200 L135,200 Q140,160 138,120 Q135,85 130,75 Z" fill="url(#bodyGrad)" />
            {/* Left arm */}
            <path d="M62,85 Q45,95 35,130 Q30,150 32,170 L38,170 Q42,150 48,130 Q55,105 65,95 Z" fill="url(#bodyGrad)" />
            {/* Right arm */}
            <path d="M138,85 Q155,95 165,130 Q170,150 168,170 L162,170 Q158,150 152,130 Q145,105 135,95 Z" fill="url(#bodyGrad)" />
            {/* Left leg */}
            <path d="M75,200 Q72,240 70,280 Q68,310 70,340 L85,340 Q83,310 85,280 Q87,245 90,200 Z" fill="url(#bodyGrad)" />
            {/* Right leg */}
            <path d="M110,200 Q113,240 115,280 Q117,310 115,340 L130,340 Q132,310 130,280 Q128,245 125,200 Z" fill="url(#bodyGrad)" />
          </g>

          {/* Organ regions — highlighted when relevant */}
          {/* Brain */}
          <ellipse
            cx="100" cy="30" rx="16" ry="18"
            className={`transition-all duration-700 cursor-pointer ${regionColor('brain')}`}
            filter={glowFilter('brain')}
            onMouseEnter={() => setHoveredRegion('brain')}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Eyes */}
          <g
            className={`transition-all duration-700 cursor-pointer ${regionColor('eyes')}`}
            filter={glowFilter('eyes')}
            onMouseEnter={() => setHoveredRegion('eyes')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <ellipse cx="90" cy="32" rx="5" ry="3" />
            <ellipse cx="110" cy="32" rx="5" ry="3" />
          </g>

          {/* Thyroid */}
          <ellipse
            cx="100" cy="68" rx="10" ry="6"
            className={`transition-all duration-700 cursor-pointer ${regionColor('thyroid')}`}
            filter={glowFilter('thyroid')}
            onMouseEnter={() => setHoveredRegion('thyroid')}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Lungs */}
          <g
            className={`transition-all duration-700 cursor-pointer ${regionColor('lungs')}`}
            filter={glowFilter('lungs')}
            onMouseEnter={() => setHoveredRegion('lungs')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <ellipse cx="82" cy="105" rx="14" ry="22" />
            <ellipse cx="118" cy="105" rx="14" ry="22" />
          </g>

          {/* Heart */}
          <ellipse
            cx="105" cy="100" rx="8" ry="10"
            className={`transition-all duration-700 cursor-pointer ${regionColor('heart')}`}
            filter={glowFilter('heart')}
            onMouseEnter={() => setHoveredRegion('heart')}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Liver */}
          <ellipse
            cx="85" cy="135" rx="15" ry="10"
            className={`transition-all duration-700 cursor-pointer ${regionColor('liver')}`}
            filter={glowFilter('liver')}
            onMouseEnter={() => setHoveredRegion('liver')}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Stomach */}
          <ellipse
            cx="108" cy="140" rx="12" ry="10"
            className={`transition-all duration-700 cursor-pointer ${regionColor('stomach')}`}
            filter={glowFilter('stomach')}
            onMouseEnter={() => setHoveredRegion('stomach')}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Pancreas */}
          <ellipse
            cx="100" cy="155" rx="16" ry="5"
            className={`transition-all duration-700 cursor-pointer ${regionColor('pancreas')}`}
            filter={glowFilter('pancreas')}
            onMouseEnter={() => setHoveredRegion('pancreas')}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Kidneys */}
          <g
            className={`transition-all duration-700 cursor-pointer ${regionColor('kidneys')}`}
            filter={glowFilter('kidneys')}
            onMouseEnter={() => setHoveredRegion('kidneys')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <ellipse cx="78" cy="155" rx="7" ry="10" />
            <ellipse cx="122" cy="155" rx="7" ry="10" />
          </g>

          {/* Intestines */}
          <ellipse
            cx="100" cy="178" rx="20" ry="15"
            className={`transition-all duration-700 cursor-pointer ${regionColor('intestines')}`}
            filter={glowFilter('intestines')}
            onMouseEnter={() => setHoveredRegion('intestines')}
            onMouseLeave={() => setHoveredRegion(null)}
          />

          {/* Blood vessels - shown as lines through body */}
          {isHighlighted('blood') && (
            <g className="animate-organ-glow" opacity="0.5">
              <line x1="100" y1="60" x2="100" y2="200" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="100" y1="95" x2="82" y2="105" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="100" y1="95" x2="118" y2="105" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4,4" />
            </g>
          )}

          {/* Spine */}
          {isHighlighted('spine') && (
            <line x1="100" y1="65" x2="100" y2="200" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" opacity="0.5" filter="url(#blueGlow)" />
          )}

          {/* Highlighted region labels */}
          {isHighlighted('brain') && (
            <text x="140" y="30" className="fill-blue-600 text-[8px] font-semibold">Brain</text>
          )}
          {isHighlighted('lungs') && (
            <text x="140" y="105" className="fill-blue-600 text-[8px] font-semibold">Lungs</text>
          )}
          {isHighlighted('heart') && (
            <text x="140" y="90" className="fill-blue-600 text-[8px] font-semibold">Heart</text>
          )}
          {isHighlighted('pancreas') && (
            <text x="140" y="155" className="fill-blue-600 text-[8px] font-semibold">Pancreas</text>
          )}
          {isHighlighted('kidneys') && (
            <text x="140" y="170" className="fill-blue-600 text-[8px] font-semibold">Kidneys</text>
          )}
          {isHighlighted('liver') && (
            <text x="30" y="135" className="fill-blue-600 text-[8px] font-semibold">Liver</text>
          )}
          {isHighlighted('stomach') && (
            <text x="140" y="140" className="fill-blue-600 text-[8px] font-semibold">Stomach</text>
          )}
        </svg>

        {/* Hover tooltip */}
        {hoveredRegion && isHighlighted(hoveredRegion) && (
          <div className="absolute top-0 left-full ml-3 bg-white border border-blue-100 rounded-xl px-3 py-2 shadow-lg z-10 min-w-[120px]">
            <p className="text-xs font-semibold text-blue-700">
              {REGION_LABELS[hoveredRegion] || hoveredRegion}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Affected area</p>
          </div>
        )}
      </div>

      {/* Legend */}
      {highlightedRegions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {highlightedRegions.map(region => (
            <span
              key={region}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-organ-glow" />
              {REGION_LABELS[region] || region}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

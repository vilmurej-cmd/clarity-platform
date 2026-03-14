'use client';

import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

interface DisclaimerBannerProps {
  className?: string;
}

const STORAGE_KEY = 'clarity-disclaimer-dismissed';

export default function DisclaimerBanner({ className = '' }: DisclaimerBannerProps) {
  const [dismissed, setDismissed] = useState(true); // Start hidden to avoid flash

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
    setDismissed(wasDismissed);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      className={`disclaimer-banner rounded-xl bg-[#FFF7ED] border border-amber-100 px-4 py-3 ${className}`}
      role="alert"
      aria-label="Medical disclaimer"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Shield className="h-5 w-5 text-amber-500" aria-hidden="true" />
        </div>
        <p className="flex-1 text-sm text-amber-800 leading-relaxed">
          CLARITY is an educational resource only. Always consult your healthcare
          team for medical decisions.
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 rounded-lg p-1 text-amber-400 hover:text-amber-600 hover:bg-amber-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500"
          aria-label="Dismiss disclaimer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

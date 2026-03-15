'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Globe, Search, X, Check } from 'lucide-react';
import { useLanguage, LANGUAGES, POPULAR_LANGUAGES, type Language } from '@/lib/language-context';

export default function UniversalLanguageSelector() {
  const { language, setLanguage, t, recentLanguages } = useLanguage();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus search on open
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 100);
    } else {
      setSearch('');
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const filteredLanguages = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  const renderLanguageItem = (lang: Language) => (
    <button
      key={lang.code}
      onClick={() => handleSelect(lang)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
        language.code === lang.code
          ? 'bg-blue-50 text-[#3B82F6]'
          : 'hover:bg-slate-50 text-slate-700'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-medium truncate">{lang.name}</span>
        <span className="text-slate-400 text-xs truncate">{lang.nativeName}</span>
        {lang.rtl && (
          <span className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-600 border border-amber-100">
            RTL
          </span>
        )}
      </div>
      {language.code === lang.code && (
        <Check className="h-4 w-4 text-[#14B8A6] shrink-0" />
      )}
    </button>
  );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        aria-label="Change language"
        title="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{language.nativeName}</span>
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 max-h-[80vh] flex flex-col animate-fade-in-up"
            role="dialog"
            aria-modal="true"
            aria-label="Select language"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#3B82F6]" />
                <h2 className="font-serif text-lg font-semibold text-slate-900">
                  Language
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label={t('common.close')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('language.searchLanguages')}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-colors"
                />
              </div>
            </div>

            {/* Language list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {filteredLanguages ? (
                /* Search results */
                <div>
                  {filteredLanguages.length === 0 ? (
                    <p className="text-center text-sm text-slate-400 py-8">
                      No languages found
                    </p>
                  ) : (
                    <div className="space-y-0.5">
                      {filteredLanguages.map(renderLanguageItem)}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Recent languages */}
                  {recentLanguages.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-4 mb-2">
                        {t('language.recentlyUsed')}
                      </h3>
                      <div className="space-y-0.5">
                        {recentLanguages.map(renderLanguageItem)}
                      </div>
                    </div>
                  )}

                  {/* Popular languages */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-4 mb-2">
                      {t('language.popular')}
                    </h3>
                    <div className="space-y-0.5">
                      {POPULAR_LANGUAGES.map(renderLanguageItem)}
                    </div>
                  </div>

                  {/* All languages */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-4 mb-2">
                      {t('language.allLanguages')}
                    </h3>
                    <div className="space-y-0.5">
                      {LANGUAGES.map(renderLanguageItem)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/lib/language-context';
import UniversalLanguageSelector from '@/components/UniversalLanguageSelector';

/* ─── Navigation ──────────────────────────────────────────────────── */

const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/how-it-works', labelKey: 'nav.howItWorks' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/resources', labelKey: 'nav.resources' },
  { href: '/kids', labelKey: 'nav.kids' },
];

function NavigationInner() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileOpen, handleKeyDown]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white border-b border-slate-100 transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link href="/" className="flex-shrink-0" aria-label="CLARITY home">
          <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
            CLARITY
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ href, labelKey }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-[#3B82F6] bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {t(labelKey)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-2">
          <UniversalLanguageSelector />
          <Link
            href="/understand"
            className="inline-flex items-center rounded-full bg-[#3B82F6] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] transition-colors"
          >
            {t('hero.cta')}
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-1">
          <UniversalLanguageSelector />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2">
          <ul className="space-y-1" role="list">
            {navLinks.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive(href)
                      ? 'text-[#3B82F6] bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  aria-current={isActive(href) ? 'page' : undefined}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <Link
              href="/understand"
              className="block w-full rounded-full bg-[#3B82F6] px-6 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
              tabIndex={mobileOpen ? 0 : -1}
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────── */

function FooterInner() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: '/understand', labelKey: 'hero.cta' },
    { href: '/how-it-works', labelKey: 'nav.howItWorks' },
    { href: '/about', labelKey: 'nav.about' },
    { href: '/resources', labelKey: 'nav.resources' },
    { href: '/kids', labelKey: 'nav.kids' },
  ];

  const legalLinks = [
    { href: '/privacy', labelKey: 'nav.privacy' },
    { href: '/terms', labelKey: 'nav.terms' },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-100" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="CLARITY home">
              <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
                CLARITY
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {t('footer.mission')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {quickLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {legalLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Connect
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              <li>
                <a
                  href="mailto:hello@clarityhealth.ai"
                  className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                >
                  hello@clarityhealth.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer card */}
        <div
          className="mt-12 rounded-2xl bg-amber-50 border border-amber-100 px-6 py-5"
          role="note"
          aria-label="Medical disclaimer"
        >
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong className="font-semibold">Important:</strong>{' '}
            {t('disclaimer')}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 bg-slate-100/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>{t('footer.company')}</span>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <span>{t('footer.builtWith')}</span>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <span>&copy; {new Date().getFullYear()} CLARITY Health. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Client Layout (wraps everything) ────────────────────────────── */

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <NavigationInner />
      <main className="flex-1">{children}</main>
      <FooterInner />
    </LanguageProvider>
  );
}

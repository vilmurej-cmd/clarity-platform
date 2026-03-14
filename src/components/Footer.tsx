import Link from 'next/link';

const quickLinks = [
  { href: '/understand', label: 'Start Understanding' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About CLARITY' },
  { href: '/resources', label: 'Resources' },
  { href: '/kids', label: 'CLARITY Kids' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

const connectLinks = [
  { href: 'mailto:hello@clarityhealth.ai', label: 'hello@clarityhealth.ai' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100" role="contentinfo">
      {/* Main footer grid */}
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
              Understanding your health, in your words. Free, private, and built
              to empower patients everywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                  >
                    {label}
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
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                  >
                    {label}
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
              {connectLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-slate-600 hover:text-[#3B82F6] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
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
            <strong className="font-semibold">Important:</strong> CLARITY is an
            educational tool. It does not provide medical advice, diagnosis, or
            treatment. Always consult your healthcare team for decisions about
            your health.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 bg-slate-100/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <span>A Vilmure Ventures Company</span>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <span>Built with care by humans and AI</span>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <span>&copy; {new Date().getFullYear()} CLARITY Health. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

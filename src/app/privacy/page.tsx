import type { Metadata } from 'next';
import { Shield, Lock, EyeOff, BanIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — CLARITY Health',
  description:
    'CLARITY\'s privacy policy. We never store your health information, never sell data, never show ads. Your reports exist only in your browser.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-blue-50 pb-16 pt-16 sm:pt-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Shield className="h-8 w-8 text-[#3B82F6]" />
          </div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Your Privacy Is Our Promise
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            We built CLARITY with a radical approach to privacy: we simply do not
            collect your health data. There is nothing to breach, nothing to sell,
            and nothing to worry about.
          </p>
        </div>
      </section>

      {/* 4 Key Points */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                icon: EyeOff,
                title: 'We never store your health information',
                description:
                  'Your condition description and report are processed in real-time and never saved to any database or server.',
              },
              {
                icon: BanIcon,
                title: 'We never sell data',
                description:
                  'We have no data to sell. We do not build profiles, track health queries, or share information with third parties.',
              },
              {
                icon: Shield,
                title: 'We never show ads',
                description:
                  'CLARITY is ad-free. We will never show pharmaceutical ads, sponsored content, or targeted health marketing.',
              },
              {
                icon: Lock,
                title: 'Your reports exist only in your browser',
                description:
                  'When you close your browser tab, your report is gone. We have no copy, no backup, and no record of it.',
              },
            ].map((point, i) => {
              const Icon = point.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-[#3B82F6] p-8 text-white shadow-lg shadow-blue-200"
                >
                  <Icon className="h-8 w-8 mb-4 text-blue-200" />
                  <h2 className="text-lg font-bold">{point.title}</h2>
                  <p className="mt-2 text-blue-100 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="prose-slate space-y-12">
            {/* Information We Don't Collect */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Information We Do Not Collect
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                CLARITY is designed to minimize data collection. Here is what we
                explicitly do not collect:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  'Health conditions, symptoms, or diagnoses you describe',
                  'Personal identifiers such as your name, email, phone number, or address',
                  'Medical history or health records',
                  'Insurance information',
                  'Your generated CLARITY reports',
                  'Search queries or browsing patterns related to health topics',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Shield className="h-3 w-3 text-green-600" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How CLARITY Works */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                How CLARITY Processes Your Information
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Understanding how your data flows through CLARITY is important. Here
                is exactly what happens when you use the platform:
              </p>
              <div className="mt-6 space-y-4">
                {[
                  {
                    step: '1. Your Browser',
                    detail:
                      'You type your condition or question into the CLARITY interface. This information exists only in your browser.',
                  },
                  {
                    step: '2. AI Processing',
                    detail:
                      'Your description is sent securely to Anthropic\'s Claude AI for processing. Claude generates your personalized report based on medical knowledge.',
                  },
                  {
                    step: '3. Response',
                    detail:
                      'The generated report is sent back to your browser and displayed on your screen.',
                  },
                  {
                    step: '4. Your Browser (again)',
                    detail:
                      'Your report exists only in your browser session. When you close the tab or navigate away, it is gone. We do not save a copy anywhere.',
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="text-sm font-bold text-[#3B82F6]">{step.step}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-slate-600 leading-relaxed">
                At no point in this process does CLARITY store, log, or retain your
                health information. The data flows through our systems and is
                immediately discarded.
              </p>
            </div>

            {/* Cookies & Analytics */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Cookies &amp; Analytics
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                CLARITY uses minimal, standard web analytics to understand general
                usage patterns (such as page views and general geographic region).
                This data is anonymous and aggregated. It never includes:
              </p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                  Any health-related information you enter
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                  The content of your generated reports
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                  Personal identifiers that could link analytics data to you
                </li>
              </ul>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We may use essential cookies to ensure the website functions correctly.
                These cookies do not track health information or personal data.
              </p>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Third-Party Services
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                CLARITY uses Anthropic&apos;s Claude AI to generate your health reports.
                When you submit a condition description, it is sent to Anthropic&apos;s
                API for processing. We encourage you to review{' '}
                <a
                  href="#"
                  className="text-[#3B82F6] underline hover:text-[#2563EB]"
                >
                  Anthropic&apos;s privacy policy
                </a>{' '}
                for details on how they handle API requests.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                We do not use any third-party advertising services, data brokers,
                health data aggregators, or social media tracking pixels.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Your Rights
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Because we do not collect or store personal data, many traditional
                privacy rights (access, deletion, portability) are inherently
                satisfied — there is simply nothing to access, delete, or transfer.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                You always have the right to:
              </p>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3B82F6]" />
                  Use CLARITY without creating an account or providing personal information
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3B82F6]" />
                  Close your browser to immediately remove all report data
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3B82F6]" />
                  Contact us with any privacy concerns or questions
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-900">
                Contact Us
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                If you have any questions about this privacy policy or how CLARITY
                handles your information, please contact us at:
              </p>
              <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-5">
                <p className="font-medium text-slate-900">CLARITY Health</p>
                <p className="text-slate-600">A Vilmure Ventures Company</p>
                <p className="mt-2 text-[#3B82F6]">hello@clarityhealth.ai</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm text-slate-400">
                Last updated: March 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

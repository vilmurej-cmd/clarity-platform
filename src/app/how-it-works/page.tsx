import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageSquare,
  BookOpen,
  FileText,
  UserCheck,
  Shield,
  Check,
  X,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How CLARITY Works — Your Simple 4-Step Process',
  description:
    'Learn how CLARITY transforms confusing medical information into plain-language reports you can understand. Describe your situation, get AI-powered research, and walk into your next appointment prepared.',
};

const faqs = [
  {
    q: 'Is CLARITY free?',
    a: 'Yes, CLARITY is completely free to use. There are no hidden costs, no premium tiers, and no paywalls. We believe every patient deserves to understand their health, regardless of their financial situation.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. You never need to create an account, sign up, or provide any personal information. Just visit the site and start typing. It is that simple.',
  },
  {
    q: 'Is my information stored?',
    a: 'No. We do not store your health information anywhere. Your report is generated in real-time and exists only in your browser. When you close the tab, it is gone. We have no database of patient queries.',
  },
  {
    q: 'Can CLARITY diagnose me?',
    a: 'No. CLARITY is an educational tool, not a diagnostic tool. It helps you understand medical concepts and prepare informed questions for your doctor. Only a qualified healthcare professional can provide a diagnosis.',
  },
  {
    q: 'What conditions does it cover?',
    a: 'CLARITY can help you understand virtually any medical condition, diagnosis, procedure, or term you describe. From common conditions like diabetes and hypertension to rare diseases, our AI draws from comprehensive medical literature to provide clear explanations.',
  },
  {
    q: 'How accurate is the information?',
    a: 'CLARITY draws from established medical literature and trusted health sources. However, medicine is complex and constantly evolving. We always recommend verifying information with your healthcare provider. Think of CLARITY as a starting point for understanding, not a final authority.',
  },
  {
    q: 'Can I share my report?',
    a: 'Yes. You can print your report directly from your browser or save it as a PDF. Many patients bring their CLARITY report to their next doctor appointment to guide the conversation.',
  },
  {
    q: 'Who built CLARITY?',
    a: 'CLARITY is a Vilmure Ventures company, built with care by humans and AI. We are a team passionate about making healthcare information accessible to everyone.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-blue-50 pb-16 pt-16 sm:pt-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            How CLARITY Works
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            From confusion to confidence in four simple steps. No account needed, no
            data stored, no medical jargon required.
          </p>
        </div>
      </section>

      {/* Expanded 4 Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-24">
          {/* Step 1 */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold text-xl shadow-lg shadow-blue-200">
                  1
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <MessageSquare className="h-6 w-6 text-[#3B82F6]" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
                Describe Your Situation
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Start by telling CLARITY what your doctor told you. Use your own words
                — you do not need to know the correct medical terminology. You can type
                a diagnosis name, describe symptoms, or even paste text from a medical
                report.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Share as much or as little as you are comfortable with. The more detail
                you provide, the more personalized your report will be. But even a
                single term like &quot;Type 2 diabetes&quot; or &quot;ACL tear&quot; is enough
                to get started.
              </p>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                Remember: nothing you type is ever stored or saved. Your words go
                directly to the AI and are forgotten immediately after your report is
                generated.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-hidden="true">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="h-3 w-32 rounded bg-slate-200 mb-3" />
                <div className="rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/50 p-4 min-h-[120px]">
                  <p className="text-sm text-blue-400 italic">
                    &quot;My doctor said I have a herniated disc at L4-L5 and mentioned
                    something about sciatica...&quot;
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="h-10 w-40 rounded-full bg-[#3B82F6] flex items-center justify-center">
                    <span className="text-sm font-medium text-white">Generate Report</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className="lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#14B8A6] text-white font-bold text-xl shadow-lg shadow-teal-200">
                  2
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                  <BookOpen className="h-6 w-6 text-[#14B8A6]" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
                AI-Powered Research
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Behind the scenes, CLARITY&apos;s AI reads through extensive medical
                literature, clinical guidelines, and trusted health resources. It
                synthesizes complex information from multiple sources into a single,
                coherent explanation.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                The AI is designed to translate medical language — not to make medical
                decisions. It identifies the key concepts you need to understand and
                presents them in plain, compassionate language.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                This takes just a few seconds. While you wait, CLARITY shows you
                exactly what it is working on so you know your report is being
                thoughtfully prepared.
              </p>
            </div>
            <div className="lg:order-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-hidden="true">
              <div className="space-y-3">
                {['Reading medical literature...', 'Analyzing treatment options...', 'Preparing plain-language summary...', 'Generating your questions...'].map(
                  (text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${i < 2 ? 'bg-teal-100' : 'bg-slate-100'}`}>
                        {i < 2 ? (
                          <Check className="h-4 w-4 text-[#14B8A6]" />
                        ) : (
                          <div className="h-3 w-3 rounded-full bg-slate-300" />
                        )}
                      </div>
                      <span className={`text-sm ${i < 2 ? 'text-slate-700' : 'text-slate-400'}`}>
                        {text}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F59E0B] text-white font-bold text-xl shadow-lg shadow-amber-200">
                  3
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                  <FileText className="h-6 w-6 text-[#F59E0B]" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
                Your Personalized Report
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Your CLARITY report is organized into five clear sections, each
                designed to answer the questions patients most often have:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  'What This Means — A plain-language explanation of your condition',
                  'Treatment Options — What approaches exist and how they work',
                  'Side Effects & Risks — Honest, balanced information',
                  'Questions for Your Doctor — Specific, informed questions to ask',
                  'Support Resources — Organizations and communities that can help',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F59E0B]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Everything is written at a reading level anyone can understand. No
                jargon, no assumptions, no condescension.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-hidden="true">
              <div className="flex gap-2 mb-4">
                {['Overview', 'Treatments', 'Side Effects', 'Questions', 'Support'].map(
                  (tab, i) => (
                    <div
                      key={i}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        i === 0
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {tab}
                    </div>
                  )
                )}
              </div>
              <div className="space-y-2">
                <div className="h-3 w-3/4 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-5/6 rounded bg-slate-100" />
                <div className="h-3 w-2/3 rounded bg-slate-100" />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div className="lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3B82F6] text-white font-bold text-xl shadow-lg shadow-blue-200">
                  4
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  <UserCheck className="h-6 w-6 text-[#3B82F6]" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
                Prepared for Your Appointment
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Knowledge is power — especially in a doctor&apos;s office. With your
                CLARITY report in hand, you can have a real, informed conversation with
                your healthcare team.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Print your report or save it as a PDF. Bring it to your appointment.
                Use the generated questions as a starting point. Your doctor will
                appreciate a patient who is engaged and informed.
              </p>
              <p className="mt-3 text-slate-600 leading-relaxed">
                You do not need to memorize anything. CLARITY gives you the words
                so you can focus on listening, asking, and understanding.
              </p>
            </div>
            <div className="lg:order-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-hidden="true">
              <div className="text-center py-8">
                <div className="mx-auto h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <UserCheck className="h-10 w-10 text-[#3B82F6]" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  &quot;I finally understood what my doctor was telling me.&quot;
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Walk in confident. Walk out empowered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What CLARITY Is and Isn't */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            What CLARITY Is &mdash; and Isn&apos;t
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
            Transparency is one of our core values. Here is exactly what you can
            and cannot expect from CLARITY.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* IS */}
            <div className="rounded-2xl bg-white border border-green-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-green-700 mb-6">
                CLARITY Is
              </h3>
              <ul className="space-y-4">
                {[
                  'An educational resource that helps you understand medical concepts',
                  'A plain-language translator for medical terminology',
                  'A question preparer that helps you have better doctor conversations',
                  'A support finder that connects you with relevant organizations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-4 w-4 text-green-600" />
                    </span>
                    <span className="text-slate-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ISN'T */}
            <div className="rounded-2xl bg-white border border-red-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-red-700 mb-6">
                CLARITY Is Not
              </h3>
              <ul className="space-y-4">
                {[
                  'Medical advice — we do not tell you what to do about your health',
                  'A diagnosis tool — only a doctor can diagnose conditions',
                  'A replacement for doctors — we help you prepare, not replace your care team',
                  'An emergency resource — if you are in crisis, call 911 or go to the ER',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                      <X className="h-4 w-4 text-red-600" />
                    </span>
                    <span className="text-slate-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-8 w-8 text-[#3B82F6]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Your Privacy Is Absolute
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We designed CLARITY with a radical approach to privacy: we simply do
              not collect your data.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
              {[
                'We never store your health information',
                'We never sell data',
                'We never show ads',
                'Reports exist only in your browser',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
                >
                  <Shield className="h-5 w-5 flex-shrink-0 text-[#3B82F6]" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Read our full{' '}
              <Link href="/privacy" className="text-[#3B82F6] underline hover:text-[#2563EB]">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Everything you might want to know before getting started.
          </p>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left font-medium text-slate-900 hover:text-[#3B82F6] transition-colors [&::-webkit-details-marker]:hidden list-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Ready to try it?
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No account. No data stored. Just understanding.
          </p>
          <div className="mt-8">
            <Link
              href="/understand"
              className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-[#2563EB] hover:shadow-xl hover:shadow-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              Start Understanding
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight, Lock, Pill, CalendarDays } from 'lucide-react';
import TrustStrip from '@/components/TrustStrip';
import HowItWorks from '@/components/HowItWorks';
import ConditionGrid from '@/components/ConditionGrid';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ---------------------------------------------------------------- */}
      {/*  Hero Section with EKG animation                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-blue-50 pb-20 pt-16 sm:pt-24 lg:pt-32">
        {/* Animated EKG heartbeat line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-[0.08]" aria-hidden="true">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0,50 L200,50 L230,50 L250,20 L270,80 L290,10 L310,90 L330,50 L360,50 L1200,50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
              className="ekg-line"
            />
          </svg>
        </div>

        {/* Floating ambient circles */}
        <div className="pointer-events-none absolute top-20 left-10 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-48 w-48 rounded-full bg-indigo-100 opacity-20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Privacy badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-medium text-blue-700 mb-8">
            <Lock className="h-3.5 w-3.5" />
            Nothing you share is stored. Ever.
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            See your health.
            <br className="hidden sm:block" />
            <span className="text-[#3B82F6]">Understand your fight.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            CLARITY translates medical information into language you can actually
            understand — with visual body diagrams, treatment comparisons, and
            printable questions for your doctor. Free. Private. Always.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/understand"
              className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-[#2563EB] hover:shadow-xl hover:shadow-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] animate-blue-pulse"
            >
              Start Understanding
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#3B82F6]"
            >
              See how it works
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Quick feature highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Visual body diagrams
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Treatment comparisons
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Printable questions
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              75+ languages
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Trust Strip                                                      */}
      {/* ---------------------------------------------------------------- */}
      <TrustStrip />

      {/* ---------------------------------------------------------------- */}
      {/*  How It Works                                                     */}
      {/* ---------------------------------------------------------------- */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Trust Indicators                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4">
            Powered by the latest medical research
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            <span>NIH</span>
            <span className="hidden sm:block text-slate-200">|</span>
            <span>WHO</span>
            <span className="hidden sm:block text-slate-200">|</span>
            <span>Mayo Clinic</span>
            <span className="hidden sm:block text-slate-200">|</span>
            <span>CDC</span>
            <span className="hidden sm:block text-slate-200">|</span>
            <span>Cleveland Clinic</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Conditions Grid                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Conditions We Can Help With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
            Select a category to get started, or describe your condition in your own words.
          </p>
        </div>
        <ConditionGrid />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  New Features: Medications + Prepare                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
            More Ways CLARITY Helps
          </h2>
          <p className="mx-auto max-w-2xl text-center text-slate-500 mb-12">
            Beyond understanding your diagnosis, CLARITY helps you stay safe and stay prepared.
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Medication Checker */}
            <Link
              href="/medications"
              className="group rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-200"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 mb-5" aria-hidden="true">
                <Pill className="h-7 w-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                Medication Interaction Checker
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Taking multiple medications? Check for potential interactions, food conflicts, and timing guidance — all in plain language.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3B82F6] group-hover:gap-2.5 transition-all">
                Check your medications <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Appointment Prep */}
            <Link
              href="/prepare"
              className="group rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-200"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 mb-5" aria-hidden="true">
                <CalendarDays className="h-7 w-7 text-teal-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
                Prepare for Your Appointment
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Walk into your next appointment prepared with a personalized checklist, what to expect, and your rights as a patient.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3B82F6] group-hover:gap-2.5 transition-all">
                Start preparing <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Testimonials Section                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl mb-12">
            What Patients Are Saying
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                quote: "I finally understood what my doctor was trying to tell me. The body diagram showed me exactly where the problem was.",
                name: "Sarah M.",
                condition: "Breast cancer patient",
              },
              {
                quote: "I walked into my appointment with real questions for the first time. My doctor was impressed.",
                name: "Robert T.",
                condition: "Type 2 Diabetes",
              },
              {
                quote: "My daughter used CLARITY Kids and now she's not scared anymore. She actually understands her asthma.",
                name: "Maria L.",
                condition: "Parent of asthma patient",
              },
            ].map((testimonial, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6">
                <p className="text-sm italic leading-relaxed text-slate-600 mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">{testimonial.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Quote Section                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote>
            <p className="font-serif text-2xl italic leading-relaxed text-slate-800 sm:text-3xl">
              &ldquo;Every patient deserves to understand their fight.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Final CTA                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Ready to understand?
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No account needed. No data stored. Just clarity.
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

          {/* Final privacy badge */}
          <div className="mt-8 inline-flex items-center gap-2 text-xs text-slate-400">
            <Lock className="h-3.5 w-3.5" />
            <span>Nothing you share is stored. Your information stays on your device.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

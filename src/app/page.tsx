import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TrustStrip from '@/components/TrustStrip';
import HowItWorks from '@/components/HowItWorks';
import ConditionGrid from '@/components/ConditionGrid';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ---------------------------------------------------------------- */}
      {/*  Hero Section                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-blue-50 pb-20 pt-16 sm:pt-24 lg:pt-32">
        {/* Subtle animated heartbeat SVG */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-[0.08]" aria-hidden="true">
          <svg
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0,50 L200,50 L230,50 L250,20 L270,80 L290,10 L310,90 L330,50 L360,50 L1200,50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
              className="animate-heartbeat-line"
            />
          </svg>
          <style>{`
            @keyframes heartbeat-dash {
              to { stroke-dashoffset: 0; }
            }
            .animate-heartbeat-line {
              stroke-dasharray: 1600;
              stroke-dashoffset: 1600;
              animation: heartbeat-dash 3s ease-in-out forwards, heartbeat-dash 3s ease-in-out 4s forwards infinite;
            }
          `}</style>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Understanding your health,
            <br className="hidden sm:block" />
            <span className="text-[#3B82F6]"> in your words.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            CLARITY translates medical information into language you can actually
            understand. Free. Private. Always.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/understand"
              className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-[#2563EB] hover:shadow-xl hover:shadow-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
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
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Trust Strip                                                      */}
      {/* ---------------------------------------------------------------- */}
      <TrustStrip />

      {/* ---------------------------------------------------------------- */}
      {/*  How It Works (scroll anchor)                                     */}
      {/* ---------------------------------------------------------------- */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Conditions We Can Help With                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Conditions We Can Help With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
            Select a category to get started, or describe your condition in your
            own words.
          </p>
        </div>
        <ConditionGrid />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Testimonial / Quote Section                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote>
            <p className="font-serif text-2xl italic leading-relaxed text-slate-800 sm:text-3xl">
              &ldquo;Every patient deserves to understand their fight.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Final CTA Section                                                */}
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
        </div>
      </section>
    </div>
  );
}

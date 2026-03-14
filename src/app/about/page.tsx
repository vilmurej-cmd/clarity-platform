import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Eye, Shield, ArrowRight, Sparkles, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CLARITY — Our Mission to Empower Patients',
  description:
    'CLARITY was born from a simple belief: medical information should not require a medical degree to understand. Learn about our mission, values, and the team behind the platform.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Quote */}
      <section className="bg-gradient-to-b from-white to-blue-50 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <blockquote>
            <p className="font-serif text-3xl font-bold leading-snug tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              &ldquo;Every patient deserves to
              <br className="hidden sm:block" />
              <span className="text-[#3B82F6]"> understand their fight.</span>&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* The Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            The Story
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
            <p>
              CLARITY was born from a simple belief: medical information should not
              require a medical degree to understand.
            </p>
            <p>
              When someone receives a diagnosis, their first instinct is to search
              online. What they find is often terrifying, confusing, and written for
              doctors — not patients. Medical journals use language that assumes years
              of training. Health websites bury useful information under ads and
              clickbait. Forums are full of worst-case stories.
            </p>
            <p>
              The result? Patients walk into their next appointment more confused and
              more afraid than before. They do not know what questions to ask. They
              do not understand their options. They feel powerless in a system that is
              supposed to be helping them.
            </p>
            <p>
              We built CLARITY to change that.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#3B82F6]">
            Our Mission
          </p>
          <h2 className="mt-4 font-serif text-2xl font-bold leading-snug text-slate-900 sm:text-3xl md:text-4xl">
            To translate the language of medicine
            <br className="hidden sm:block" />
            into the language of understanding.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 leading-relaxed">
            We believe that understanding is the first step toward empowerment. When
            you understand your condition, you can ask better questions, make informed
            decisions, and take an active role in your care.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Values
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Three principles guide everything we build.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                color: 'text-rose-500',
                bg: 'bg-rose-50',
                title: 'Compassion First',
                description:
                  'Every word is chosen with care. We know that behind every search is a real person dealing with something difficult. Our language is warm, clear, and never condescending.',
              },
              {
                icon: Eye,
                color: 'text-[#3B82F6]',
                bg: 'bg-blue-50',
                title: 'Radical Transparency',
                description:
                  'We tell you exactly what we are and what we are not. We will never pretend to be something we are not, and we will always be upfront about our limitations.',
              },
              {
                icon: Shield,
                color: 'text-[#14B8A6]',
                bg: 'bg-teal-50',
                title: 'Privacy as a Right',
                description:
                  'Your health information is yours alone. We do not collect it, store it, sell it, or share it. Period. Privacy is not a feature — it is a fundamental right.',
              },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center"
                >
                  <div
                    className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${value.bg}`}
                  >
                    <Icon className={`h-7 w-7 ${value.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vilmure Ventures */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            A Vilmure Ventures Company
          </p>
          <h2 className="mt-4 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            Built with care by humans and AI
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 leading-relaxed">
            Vilmure Ventures builds technology that empowers people. From real estate
            to healthcare, we believe technology should serve human needs — making
            complex systems understandable, accessible, and fair.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 leading-relaxed">
            CLARITY represents our commitment to using AI for good — not to replace
            human connection, but to enhance it. Every feature is designed to bring
            patients and their doctors closer together.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            The Team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            A small team with a big mission.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            {/* Josh */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <Users className="h-10 w-10 text-[#3B82F6]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Josh Vilmure</h3>
              <p className="text-sm font-medium text-[#3B82F6]">Founder</p>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Entrepreneur and builder. Josh founded Vilmure Ventures with the
                belief that technology should make complex systems accessible to
                everyone. CLARITY is the embodiment of that mission in healthcare.
              </p>
            </div>

            {/* Claude */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
                <Sparkles className="h-10 w-10 text-[#14B8A6]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Claude</h3>
              <p className="text-sm font-medium text-[#14B8A6]">AI Partner</p>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Built by Anthropic, Claude is the AI that powers CLARITY&apos;s
                medical research and plain-language translation. Designed to be
                helpful, harmless, and honest — the perfect qualities for a patient
                education tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
            Join our mission
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Every person who understands their diagnosis a little better is a win for
            all of us.
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
